## 中间件

中间件是在路由处理程序之前调用的函数。中间件函数可以访问请求和响应对象，以及应用程序请求-响应周期中的 next() 中间件函数。下一个中间件函数通常由名为 的 next 变量表示。<br/>

创建一个中间件

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req)
    next()
  }
}
```

注入中间件

```typescript
//Person.module.ts
...
interface forRoutes {
  path: string;
  method: RequestMethod;
  version?: VersionValue;
}
export declare enum RequestMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    PATCH = 4,
    ALL = 5,
    OPTIONS = 6,
    HEAD = 7,
    SEARCH = 8
}

export class PersonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerWare).forRoutes('person') // forRoutes:string | forRoutes
  }
}
```

forRoutes 还支持通配符

```typescript
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL })
```

'ab*cd' 路由路径将匹配 abcd 、 ab_cd abecd 、 等。字符 ? 、 + 、 * 和 () 可以在路由路径中使用，并且是其正则表达式对应项的子集。连字符 （ - ） 和点 （ . ） 由基于字符串的路径逐字解释。<br/>

[Middleware 详细内容](https://docs.nestjs.com/middleware#middleware)
