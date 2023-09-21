## provider

Nest 实现了 IOC 容器，会从入口模块开始扫描，分析 Module 之间的引用关系，对象之间的依赖关系，自动把 provider 注入到目标对象。<br/>
provider 一般都是用 @Injectable 修饰的 class：

```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class PersonService {}
```

在 module 里面的 provide 声明

```typescript
// app.modules.ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonModule } from './person/person.module'

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

此外 provide 还可以自定义名字以及自定义值

```typescript

@Module({
  controllers: [UserController],
  providers: [{
    provide: "Xiaoman", // inject参数
    useClass: UserService // 值
  }, {
    provide: "JD",
    useValue: ['TB', 'PDD', 'JD'] // 自定义值
  }]

```

使用 provide 内注入的值

```typescript
// User.controller.ts
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    @Inject('Xiaoman')  private readonly userService: UserService
    @Inject('Xiaoman')  private readonly JD:string[]
    ) {}
}
```

在此使用@inject 修饰器，会自动帮我们把 provide 的值设为 controller 的实例属性/方法,因此我们也可以不设置 constructor，直接使用修饰器即可，对上面代码做简单修改

```typescript
// User.controller.ts
@Controller()
export class AppController {
  @Inject(AppService) private readonly appService: AppService
  @Inject('Xiaoman') private readonly userService: UserService
  @Inject('Xiaoman') private readonly JD: string[]
}
// 这样也是完全相同的，可以正常使用注入的方法
```

**总结**
一般情况下，provider 是通过 @Injectable 声明，然后在 @Module 的 providers 数组里注册的 class。

默认的 token 就是 class，这样不用使用 @Inject 来指定注入的 token。

但也可以用字符串类型的 token，不过注入的时候要用 @Inject 单独指定。

除了可以用 useClass 指定注入的 class，还可以用 useValue 直接指定注入的对象。

如果想动态生成对象，可以使用 useFactory，它的参数也注入 IOC 容器中的对象，然后动态返回 provider 的对象。

如果想起别名，可以用 useExisting 给已有的 token，指定一个新 token。

灵活运用这些 provider 类型，就可以利用 Nest 的 IOC 容器中注入任何对象。
