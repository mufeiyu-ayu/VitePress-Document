## 异常筛选器

Nest 带有一个内置的异常层，负责处理整个应用程序中的所有未经处理的异常。当应用程序代码未处理异常时，该层会捕获该异常，然后自动发送适当的用户友好响应。<br/>

虽然基本（内置）异常筛选器可以自动为您处理许多情况，但我们可能希望完全控制异常层。例如，您可能希望添加日志记录或根据某些动态因素使用不同的 JSON 架构。异常筛选器正是为此目的而设计的。它们允许您控制确切的控制流以及发送回客户端的响应内容。

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
// 异常赛选器
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
```

### 使用方式

#### 1. 全局使用

```typescript
// main.ts  全局使用    app.useGlobalFilters(new HttpExceptionFilter())
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()
```

#### 2. 局部使用

```typescript
// person.controller.ts 局部使用
@Controller('person')
@UseFilters(new HttpExceptionFilter())
export class PersonController {}
```

#### 3. 动态使用

```typescript
// person.controller.ts 动态使用
@Controller('person')
export class PersonController {
  @Get()
  @UseFilters(new HttpExceptionFilter()) // 最好使用类，这样可以有缓存 HttpExceptionFilter
  findAll() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
```
