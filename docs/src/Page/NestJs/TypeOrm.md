## TypeOrm

Nest 与数据库无关，允许您轻松地与任何 SQL 或 NoSQL 数据库集成。根据您的喜好，您有许多选项可供您使用。在最一般的层面上，将 Nest 连接到数据库只是为数据库加载适当的 Node.js 驱动程序，就像使用 Express 或 Fastify 一样。在此我们使用 TypeORM。以下是关于 TypeORM 的一些基本信息：

- TypeORM 是一个 ORM 框架，它可以运行在 NodeJS、浏览器、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5, ES6, ES7, ES8) 一起使用。

### 安装

```npm
npm install --save @nestjs/typeorm typeorm mysql
```

安装完成后在 app.module.ts 中引入

```typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [
    PersonModule,
    UserModule,
    TypeOrmModule.forRoot({
      // 配置信息
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: 'xiangjiayi53822', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'db', //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库 生产环境不建议使用
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 存储库

TypeORM 支持存储库设计模式，因此每个实体都有自己的存储库。可以从数据库数据源获取这些存储库。

```typescript
// user.entity.ts
// 创建一个实体，并且将其映射到数据库表
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ default: true })
  isActive: boolean
}
```

**使用实体**

```typescript
import { Module } from '@nestjs/common'
import { TestService } from './test.service'
import { TestController } from './test.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test } from './entities/test.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
```

此模块使用 forFeature() 该方法定义在当前范围内注册的存储库。有了这个，我们可以将它 TestRepository 注入到使用装饰器中 TestService @InjectRepository()

```typescript
import { Injectable } from '@nestjs/common'
import { CreateTestDto } from './dto/create-test.dto'
import { UpdateTestDto } from './dto/update-test.dto'
import { Test } from './entities/test.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class TestService {
  @InjectRepository(Test) private usersRepository: Repository<Test>
  create(createTestDto: CreateTestDto) {
    const test = new Test()
    test.firstName = createTestDto.firstName
    test.lastName = createTestDto.lastName
    test.isActive = createTestDto.isActive
    return this.usersRepository.save(test) // 添加数据
  }

  findAll(): Promise<Test[]> {
    return this.usersRepository.find()
  }

  findOne(firstName: string): Promise<Test | null> {
    return this.usersRepository.findOneBy({ firstName })
  }
  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`
  }

  async remove(id: number): Promise<void> {
    // await this.usersRepository.delete(id);
    await this.usersRepository
      .createQueryBuilder('Test')
      .delete()
      .where('id = :id', { id })
      .execute()
  }
}
```

### Repository

使用 EntityManager 您可以管理（插入、更新、删除、加载等）任何实体。实体管理器就像一个地方所有实体存储库的集合,但是我们大部分都是在使用存储库 Repository 去操作对应的实体，

在 typeorm 中存在很多操作实体来操作数据库的方法，这些方法都是通过 Repository 来实现的，而内部很多查找方法都依据 findOptions 来实现的，所以我们可以通过 findOptions 来实现更多的操作。

所有存储库和管理器 .find\* 方法都接受特殊选项，可用于查询所需的数据

```typescript
userRepository.find(findoptions: FindManyOptions<Test>): Promise<Test[]>
// 在此列出常用findoptions的查找选项
{
  select:['id','firstName'],
   // SELECT "firstName", "lastName" FROM "user
  relations:['test'],
   // LEFT JOIN "test" "test" ON "test"."id"="user"."testId"
  where:{firstName:'xiang',}, // {expression} | [{expression}]
  // WHERE "user"."firstName" = 'xiang'
 /*
 where: [
        { firstName: "Timber", lastName: "Saw" },
        { firstName: "Stan", lastName: "Lee" },
    ],
  SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')
  */
  order:{firstName:'ASC',lastName:'DESC'},
  // SELECT * FROM "user"ORDER BY "name" ASC, "id" DESC

  // 类似于limit
  skip: 5, // 跳过前5条数据
  take: 10, // 取10条数据
  //  skip 并 take 应一起使用
  cache :true  //  启用或禁用查询结果缓存。

  // 运算符
  title: Not("About #1"),
  // SELECT * FROM "post" WHERE "title" != 'About #1'
  likes: LessThan(10)
  // SELECT * FROM "post" WHERE "likes" < 10

}
```

更多请访问https://typeorm.io/find-options

## Repository API

使用 Repository 可以实现对数据库的增删改查，里面有很多方法
我观察发现带有 by 的方法是没有 by 的简写，不带 by 的需要加入 where 条件，而带 by 的不需要加入 where 条件

具体访问 https://typeorm.io/repository-api
