## Module

每个 Nest 应用程序至少有一个模块，即根模块。根模块是 Nest 开始安排应用程序树的地方。事实上，根模块可能是应用程序中唯一的模块，特别是当应用程序很小时，但是对于大型程序来说这是没有意义的。在大多数情况下，您将拥有多个模块，每个模块都有一组紧密相关的功能

### 1.基本模块

```typescript
@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

可以看到一个模块基本由 imports controllers 以及 providers 组成

### 2.共享模板

假如 app 模块想使用他子集下面的 user 模块的方法<br/>
<br/>

第一步将 userService 暴露出去

```typescript
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class AppModule {}
```

由于 user 模块在创建的时候已经注入到 app 模块了，因此可以直接在 app 模块中使用 user 模块的方法，
只需要使用 inject 声明引用便可使用

```typescript
 @Inject(PersonService)
  private readonly personService: PersonService;
  //这个时候personServie已经成为app.controller类中的实例方法了
```

那如果是平级的 user 模块想要使用 person 模块呢？<br/>
由于 2 则并没有任何关联，因此需要显示将 person 模块注入进 user 模块

```typescript
// User.modules.ts
import { PersonService } from 'src/person/person.service';
@Module({
  controllers: [UserController],
  providers: [UserService, PersonService],
})
```

### 3.全局模块

假如想让一个模块变为全局模块，那只需在模块前添加 global 装饰器即可

```typescript
@global
@module({
  controller:[...]
  providers:[...]
  exports:[...] // 不能忘记哦还是需要暴露出去
})
```

### 4.动态模块

动态模块主要就是为了给模块传递参数 可以给该模块添加一个静态方法 用来接受参数

```typescript
@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
    }
  }
}
```

然后使用 import 注入传参即可
