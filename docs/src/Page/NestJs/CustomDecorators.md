## 自定义装饰器

经过了前面的学习，我们发现 nestjs 的装饰器是非常强大的，但是有时候我们需要自定义装饰器，来实现一些特殊的功能<br/>

我们先简单实现一个装饰器

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
// 自定义装饰器
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // data是传入的参数，ctx是上下文
    const request: Request = ctx.switchToHttp().getRequest() // 请求对象
    // 我们可以通过传入的data来当返回的对象的key，然后返回特定的值
    return request.originalUrl // get something to return
  }
)
```

然后就可以直接使用它

```typescript
@Get()
async findAll(@User() user: string) {
  console.log(user)
  return this.catsService.findAll()
}
```

详细内容可以参考官方文档：[自定义装饰器](https://docs.nestjs.com/custom-decorators)
