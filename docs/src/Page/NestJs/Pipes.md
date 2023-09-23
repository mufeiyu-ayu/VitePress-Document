## 管道

管道有两个典型的用例：<br/>
转换：将输入数据转换为所需的形式（例如，从字符串转换为整数）<br/>
验证：评估输入数据，如果有效，只需原封不动地传递它;否则，引发异常

### 管道验证

```typescript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

假如路由调用方式如下

```typescript
GET localhost:3000/abc
```

那么会抛出异常

```typescript
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

### 管道验证-类验证器

Nest 与类验证器库配合得很好。这个强大的库允许您使用基于装饰器的验证。基于装饰器的验证非常强大，特别是当与 Nest 的管道功能结合使用时，因为我们可以访问 metatype 已处理的属性

```npm
npm i class-validator class-transformer
```

```typescript
// person.create.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class CreatePersonDto {
  @IsNotEmpty({ message: '姓名不能为空' }) // 验证是否为空
  @IsString({ message: '参数类型错误' }) // 验证是否为字符串
  name: string

  @IsString({ message: 'age参数需为数字类型' }) // 验证是否为字符串
  age: string
  @IsEmail({}, { message: '邮箱格式不正确' }) // 验证是否为字符串
  email: string
}
```

让我们先写一个内置的 Pipes

```typescript
// validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { HttpException } from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // value:  { name: '', age: '20', email: '2382839439@qq.com' }前端传入的参数
    // metatype:  [class CreatePersonDto] // 参数的类型
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object)
    // console.log(errors);
    if (errors.length > 0) {
      // 抛出错误对象,利用异常筛选器来接收然后返回给前端错误对象
      // HttpStatus.BAD_REQUEST规定为参数错误
      throw new HttpException(errors, HttpStatus.BAD_REQUEST, {
        description: '参数异常',
      })
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
```

使用内置 pipes

```typescript
// person.controller.ts
import {ValidationPipe} from './common/validation.pipe'
 @Post()
  @HttpCode(200)
  async create(@Body(new ValidationPipe()) CreatepersonDto: CreatePersonDto) {
    // console.log(CreatepersonDto); // { name: 'ayu', age: '20', email: '2382839439@qq.com' }
    return `received: ${JSON.stringify(CreatepersonDto)}`;
  }
```

### 全局管道

当然，nestjs 也可以使用全局管道 我们只需要将 create.dto.ts 封装好即可

```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common'
app.useGlobalPipes(new ValidationPipe())
```

### 管道修饰

验证并不是自定义管道的唯一用例。在本章开头，我们使用 nest 内置的 ParseIntPipe 将传入的值进行修饰，我们通过实现 ParseIntPipe 来学习如何做管道修饰

```typescript
// parse-int.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'

@Injectable()
export class MyParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // console.log('metadata: ', metadata); // metadata:  { type: 'param', metatype: [Function: Number], data: 'id' }
    // console.log('value: ', value); // value: 前端传入的参数
    // you can do something here before return value
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException('参数不符合规范')
    }
    return val
  }
}
```
