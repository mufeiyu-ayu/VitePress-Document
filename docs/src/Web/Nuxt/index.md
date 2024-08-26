# Nuxt

### 1.什么是 Nuxt

Nuxt.js 是一个基于 Vue.js 的框架，用于创建服务端渲染 (SSR) 的 Vue 应用程序。它提供了一些功能和结构化的方式，使开发者能够更轻松地创建 Vue 应用程序，特别是那些需要服务器端渲染的应用程序。

### 2.Nuxt 的特点

1. 更快的初始页面加载时间：Nuxt 将完全渲染的 HTML 页面发送到浏览器，可以立即显示。这可以提供更快的感知页面加载时间和更好的用户体验 (UX)，尤其是在较慢的网络或设备上。
2. 改进的 SEO：搜索引擎可以更好地索引 SSR 页面，因为 HTML 内容立即可用，而不需要 JavaScript 在客户端呈现内容。
3. 在低功耗设备上获得更好的性能：它减少了需要在客户端下载和执行的 JavaScript 数量，这对于可能难以处理繁重 JavaScript 应用程序的低功耗设备是有益的。
4. 更好的可访问性：内容在初始页面加载时立即可用，从而提高了依赖屏幕阅读器或其他辅助技术的用户的可访问性。
5. 更轻松的缓存：页面可以在服务器端缓存，这可以通过减少生成内容并将内容发送到客户端所需的时间来进一步提高性能。

### 3.nuxt.config.ts

nuxt.config.js 是 Nuxt.js 的配置文件，它允许您自定义应用程序的行为和配置。以下是一些重要的配置选项：

```ts
export default defineNuxtConfig({
  css: ['~/assets/style.scss'], // 全局引入公共 css

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.min.css',
        },
      ],
    },
  }, // 动态引入 css(本地 css 也可以使用相同方法引入)
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;', // 全局引入公共 css 变量
        },
      },
    },
  },
  // 自定义图层 内部
  extends: ['./custom'],
})
```

### 4.Nuxt 引用第三方库和模块

**tailwind css**
本次以 tailwindscss 举例

1. 安装 tailwindcss

```bash
pnpm i -D @nuxtjs/tailwindcss
```

2. 配置 tailwindcss

```ts
//nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
})
```

其他第三方库请访问[Nuxt 第三方库使用方法](https://nuxt.com/docs/getting-started/styling)

### definePageMeta 定义页面元数据

definePageMeta 定义页面元数据，用于在页面上设置元数据，例如标题、描述、关键词等。

```ts
definePageMeta({
  layout: 'default', // 设置页面布局
  middleware: 'auth',
})
```

### 渲染模式

Nuxt.js 支持两种渲染模式：

1. 服务端渲染 (SSR)：在服务器上渲染页面，然后发送给客户端。这种模式在服务器上执行 JavaScript，并将渲染后的 HTML 发送给客户端。
2. 客户端渲染 (CSR)：在客户端上渲染页面。这种模式在客户端上执行 JavaScript，并将渲染后的 HTML 发送给客户端。

**客户端渲染的缺点**

1. 性能：用户必须等待浏览器下载、解析和运行 JavaScript 文件。根据下载部分的网络以及解析和执行的用户设备，这可能需要一些时间并影响用户的体验。
2. 搜索引擎优化：对通过客户端呈现交付的内容进行索引和更新比使用服务器呈现的 HTML 文档需要更多时间。这与我们讨论的性能缺陷有关，因为搜索引擎爬虫在第一次尝试索引页面时不会等待界面完全呈现。通过纯客户端呈现，您的内容将需要更多时间在搜索结果页面中显示和更新。

**客户端渲染的优点**

1. 开发速度：当完全在客户端工作时，我们不必担心代码的服务器兼容性，例如，通过使用仅限浏览器的 API，如 window 对象。
2. 更便宜：运行服务器会增加基础设施成本，因为您需要在支持 JavaScript 的平台上运行。我们可以使用 HTML、CSS 和 JavaScript 文件在任何静态服务器上托管仅客户端应用程序。
3. 离线：由于代码完全在浏览器中运行，因此在互联网不可用时它可以很好地继续工作。

对于不需要索引或用户经常访问的交互性强的 Web 应用程序来说，客户端渲染是一个不错的选择。它可以利用浏览器缓存在后续访问（例如 SaaS、后台应用程序或在线游戏）时跳过下载阶段。

### 官方文档 bug

[ts 类型开启检查](https://nuxt.com/docs/guide/concepts/typescript)
按照官方提示安装运行 pnpm add -D vue-tsc@^1 typescript 后，发现 ts 与 vue-tsc 版本冲突
我通过修复后正常使用的版本为

```json
{
  "nuxt": "^3.12.2",
  "typescript": "5.2",
  "vue-tsc": "1.1.5"
}
```
