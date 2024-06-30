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
      link: [{ rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.min.css' }]
    }
  },  // 动态引入 css(本地 css 也可以使用相同方法引入)
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
         additionalData: '@use "~/assets/_colors.scss" as *;'// 全局引入公共 css 变量 
        }
      }
    }
  }
})

```

### 4.Nuxt引用第三方库和模块

**tailwind css**
本次以tailwindscss 举例
1. 安装tailwindcss
```bash
pnpm i -D @nuxtjs/tailwindcss
```
2. 配置tailwindcss
``` ts
//nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})
```
其他第三方库请访问[Nuxt 第三方库使用方法](https://nuxt.com/docs/getting-started/styling)


### definePageMeta 定义页面元数据
definePageMeta 定义页面元数据，用于在页面上设置元数据，例如标题、描述、关键词等。
``` ts
definePageMeta({
  layout: 'default', // 设置页面布局
 middleware: 'auth',
})
```
