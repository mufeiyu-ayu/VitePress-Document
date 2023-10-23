### 2.使用缓存

缓存是提高应用程序性能的有效技术。NestJS 使用流行的缓存库（如 Redis 和 Memcached）为缓存提供内置支持。下面是如何在 NestJS 中使用缓存的示例：

```typescript
@Injectable()
export class UserService {
  constructor(private readonly cacheManager: CacheManager) {}
  async getUser(id: number): Promise<User> {
    const user = await this.cacheManager.get(`user-${id}`)
    if (user) {
      return user
    }
    const newUser = await userRepository.findOne(id)
    await this.cacheManager.set(`user-${id}`, newUser)
    return newUser
  }
}
```

在本例中，UserService 的 getUser 方法使用 CacheManager 实例缓存用户数据。如果用户数据已经在缓存中，该方法将立即返回该数据。如果没有，该方法将从数据库中检索用户数据，使用 CacheManager 的 set 方法对其进行缓存，并将其返回。

### 3.使用压缩

压缩是提高应用程序性能的另一种技术。NestJS 使用流行的压缩库（如 zlib）为压缩提供内置支持。以下是如何在 NestJS 中使用压缩的示例：

```typescript
const app = await NestFactory.create(AppModule)
app.use(compression())
await app.listen(3000)
```

在本例中，使用应用实例的使用方法将 compression 中间件添加到 NestJS 应用程序中。该中间件在将响应数据发送到客户端之前对其进行压缩，这有助于减少数据大小并缩短响应时间。

### 4.使用速率限制

为了避免用户不要频繁请求数据，以及防止网站恶意攻击，我们可以使用@nestjs/throttler 来限制用户的请求速率。

```npm
npm install --save @nestjs/throttler
```

然后在 app.module.ts 中引入 ThrottlerModule

```typescript
 imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 6000, // time-to-live 每个请求计数记录的生存时间（秒）
        limit: 3, // 给定时间段内允许的最大请求数
      },
    ]),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, //这里是全局使用，实际开发需要视情况而定
    },
  ],
```

更多信息请访问https://docs.nestjs.com/security/rate-limiting#rate-limiting

### 5.使用相对路径而非绝对路径

您可以使用绝对路径或者相对路径来导入一个 es6 模块。在开发阶段他们会工作的很顺利，但是当尝试去构建它的时候这会崩溃。当您使用 Nest.js 的时候请始终使用相对路径。你稍后会感谢我的。（npm 运行 build 时，预计会出现绝对路径错误）

```typescript
// 相对
import { SecurityService } from '../security/security.service'
import { CommentService } from '../comment/comment.service'
// 绝对
import { SecurityService } from 'src/security/security.service'
import { CommentService } from 'src/comment/comment.service'
```

### 6.使用 Exclude()来隐藏数据

当您从数据库取得数据时，通常要通过 transformers 来筛选数据。主要的目的是为了删除或格式化从数据库过来的数据。这会产生很多垃圾逻辑。

```typescript
import { Exclude } from 'class-transformer'

export class UserEntity {
  id: number
  firstName: string
  lastName: string

  @Exclude()
  password: string
  // password不会出现在返回的数据中
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
```

### 7.使用实体 getter

有些逻辑会直接访问您的实体属性。最常见的用例与密码哈希和获取全名有关。但是要注意不要用大量的逻辑来重载实体。为此使用自定义存储库

```typescript
import { Exclude } from 'class-transformer'

export class UserEntity {
  id: number
  firstName: string
  lastName: string

  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
```

### 8.使用集中式命名导出

假设我们一个 dto 文件内部有很多的 dto，我们可以使用集中式命名导出来导出这些 dto，这样我们就可以在其他文件中直接使用这些 dto 了。只需要在 dto 文件中添加 index.dto.ts 文件，然后在 index.dto.ts 文件中导出所有的 dto 即可。

```typescript
// index.ts内部
export * from './createPost.dto'
export * from './editPost.dto'
export * from './editPostCategory.dto'
export * from './editPostStatus.dto'

// 从一个文件夹导入
import { CreatePostDto, EditPostDto } from './dto'

// 代替多个文件夹导入
import { CreatePostDto } from './dto/createPost.dto'
import { EditPostDto } from './dto/editPost.dto'
```
