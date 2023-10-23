### 1.使用 applyDecorators 减少对装饰器的依赖

对于一个业务模块，写接口以及接口文档如果不做封装，那么代码中会有大量的装饰器出现，导致代码难以阅读，所以我们可以对装饰器进行封装，减少对装饰器的依赖。

```typescript
import { applyDecorators, SetMetadata, Type } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger'

export function SwaggerDocumentation(
  summary: string,
  okDescription: string,
  badRequestDescription: string,
  type: Type
) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ description: okDescription, type }),
    ApiBadRequestResponse({ description: badRequestDescription })
  )
}
```

当然，这只是一个简单的例子，我们可以根据自己的业务需求来封装，这样我们就可以在接口中直接使用这个装饰器，而不用再引入大量的装饰器了。
