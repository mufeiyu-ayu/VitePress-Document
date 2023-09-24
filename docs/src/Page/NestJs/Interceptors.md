## 拦截器

拦截器是用装饰器注释 @Injectable() 并实现接口的 NestInterceptor 类。<br/>

拦截器的功能

1. 在方法执行之前/之后绑定额外的逻辑
2. 转换从处理程序方法返回的结果
3. 转换从处理程序抛出的异常
4. 扩展基本的处理程序类以执行额外的任务
5. 根据特定条件完全覆盖函数（例如，出于缓存目的）

###规范响应返回值

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ data, status: 0, success: true, msg: '成功' })))
  }
}
```

**使用**

1. 局部使用

```typescript
// cats.controller.ts
@UseInterceptors(TransformInterceptor)
export class CatsController {}
```

2. 全局使用

```typescript
// main.ts
app.useGlobalInterceptors(new TransformInterceptor())
```
