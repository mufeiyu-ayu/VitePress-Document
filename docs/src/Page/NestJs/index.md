---
title:nestjs
---

# nestjs

## 介绍

Nest（NestJS）是一个框架，用于构建高效，可扩展的 Node.js 服务器端应用程序。它使用渐进式 JavaScript，使用 TypeScript 构建并完全支持 TypeScript（但仍使开发人员能够使用纯 JavaScript 编码），并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应式编程）的元素。

在引擎盖下，Nest 使用强大的 HTTP 服务器框架，如 Express（默认），并且可以选择配置为使用 Fastify！

Nest 提供了高于这些常见 Node.js 框架（Express/Fastify）的抽象级别，但也直接向开发人员公开其 API。这使开发人员可以自由使用可用于底层平台的大量第三方模块。<br/>

[NestJs 官方文档](https://docs.nestjs.com/)<br/>
[NestJs 国内文档](https://docs.nestjs.cn)<hr/>

## 安装

node 版本>12

```npm
npm i -g @nestjs/cli
nest new project-name
```

### nestjs/cli 命令

```cmd
nest g resource [name] // crud模块生成器
```

<!-- @include:./dataRequests.md -->
<!-- @include:./provider.md -->
<!-- @include:./module.md -->
<!-- @include:./Middleware.md -->
<!-- @include:./ExceptionFilters.md -->
<!-- @include:./Pipes.md -->
