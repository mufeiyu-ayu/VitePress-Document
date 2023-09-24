## 警卫

守卫是用 @Injectable() 装饰器注释的类，它实现 CanActivate 接口<br/>

警卫只有一个责任。它们确定给定的请求是否将由路由处理程序处理，具体取决于运行时存在的某些条件（如权限、角色、ACL 等）。这通常称为授权。授权（及其表亲身份验证，它通常与之协作）通常由传统 Express 应用程序中的中间件处理。中间件是身份验证的不错选择，因为令牌验证和将属性附加到 request 对象等内容与特定路由上下文（及其元数据）没有很强的联系

** 通过一个例子来说明警卫的作用 **

```typescript
// auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler())
    // 指派的守卫验证

    // roles => ['admin']
    if (!roles) {
      return true
    }
    const request: Request = context.switchToHttp().getRequest()
    // 验证是否存在token

    //request.headers.authorization  => Bearer 121218218219219219281
    const token = request.headers.authorization
    console.log(token, roles)
    return matchRoles(roles, token)
    // 如果守卫验证失败我们可以加上自定义的错误信息
    // throw new UnauthorizedException('无权限访问');
  }
}
function matchRoles(roles: string[], token: string) {
  // verify
  // do something
  return true
}
```

需要使用警卫的 controller

```typescript
// person.controller.ts
// @UseGuards(new RolesGuard(new Reflector()))
// @UseGuards(RolesGuard)
@Controller('person')
export class PersonController {
  private readonly personService: PersonService
  @Post()
  @SetMetadata('role', ['admin']) // 设置的警卫验证的角色
  async create(@Body() CreatepersonDto: CreatePersonDto) {
    // console.log(CreatepersonDto); // { name: 'ayu', age: '20', email: '2382839439@qq.com' }
    return `received: ${JSON.stringify(CreatepersonDto)}`
  }
}
```

在 person.controller.ts 中，我们使用了@SetMetadata()装饰器来设置警卫验证的角色，然后在 auth.guard.ts 中使用@Reflect()装饰器来获取这个角色，然后进行验证，如果验证成功则返回 true，否则返回 false，如果返回 false 则会抛出一个异常，我们可以在 auth.guard.ts 中加上自定义的错误信息，如上面的代码所示，如果我们不加上自定义的错误信息，那么会抛出一个默认的错误信息，如下所示：

```typescript
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

并且在 person.controller.ts 中，我们使用了@UseGuards()装饰器来使用警卫，我们可以在@UseGuards()装饰器中传入一个或多个警卫，如上面的代码所示，我们传入了一个 RolesGuard 警卫，这样就可以对 person.controller.ts 中的 create()方法进行验证了，可以通过直接写类的形式，但是如果使用实例的形式就必须传入参数 new Reflector()

**全局警卫**
我们不仅可以局部对 controller 进行警卫设置，还可以设置全局通用警卫

```typescript
// main.ts
import { RolesGuard } from './common/auth.guard';
import { Reflector } from '@nestjs/core';
...
app.useGlobalGuards(new RolesGuard(new Reflector()));//我使用的时候必须要携带这个参数
```
