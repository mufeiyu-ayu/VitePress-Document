import { URL, fileURLToPath } from 'node:url'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

// import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { optimizeHtml } from 'vitepress-payload-extractor'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Ayu',
  base: '/doc/',
  titleTemplate: 'JiaJia',
  description: '黑猫警长的笔记文档',

  // 自定义源目录（自定义路由页面）
  lastUpdated: true,
  transformHtml(code) {
    return optimizeHtml(code)
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://img0.baidu.com/it/u=3581145158,1358465378&fm=253&fmt=auto&app=138&f=JPEG?w=320&h=320',
        // 这里使用本地图片老是报错，只能选择在线图片了
      },

      // { rel: "icon", href: "/logo.ico" },
    ],
  ],
  ignoreDeadLinks: true,
  // 源目录，用于存放md文件
  srcDir: './src',
  markdown: {
    lineNumbers: true, // 开启代码行号显示 希望你可以帮助我们解决这些问题
  },

  themeConfig: {

    custom404: ['/404.md'], // 这里的路径要与你的默认页面路径匹配
    // 大纲
    outline: {
      label: '大纲',
      level: 'deep',
    },
    // 导航
    nav: [
      { text: '前端', link: '/Web/' },
      { text: '后端', link: '/Page/' },
    ],
    // 侧边栏
    sidebar: {
      '/Web/': [
        {
          text: 'Web',
          items: [
            { text: '前言', link: '/Web/' },
            { text: 'HTML', link: '/Web/Tagml/index' },
            { text: 'CSS', link: '/Web/Css/css' },
            { text: 'JavaScript', link: '/Web/JavaScript/index' },
            { text: 'TypeScript', link: '/Web/Typescript/index' },
            { text: 'Vue', link: '/Web/Vue/Vue' },
          ],
        },
      ],
      '/Page/': [
        {
          text: '后端',
          items: [
            { text: '前言', link: '/Page/' },
            { text: 'NestJs', link: '/Page/NestJs/index' },
            { text: 'MySQL', link: '/Page/Mysql/index' },
            {text:"Redis" ,link:'/Page/Redis/index'},
            {text:"Docker" ,link:'/Page/Docker/index'},
            {text:"Hobby",link:'/Page/Hobby/index'}
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/mufeiyu-ayu' }],
    footer: {
      message: 'Email:2382839439@qq.com Vx:jiaxiaoyi825',
      copyright: '版权所有 鄂ICP备2023016974号',
    },
    // 上一页下一页
    docFooter: {
      prev: '道行太浅，回去修炼吧！！！',
      next: '它丫的，继续冲',
    },
    editLink: {
      pattern: 'https://github.com/mufeiyu-ayu',
      text: 'Edit this page on GitHub',
    },
    // 最后一次更新
    lastUpdated: true,
    search: {
      provider: 'local',
    },
  },
  vite: {
    plugins: [
      AutoImport({
        imports: ['vue'],
        resolvers: [AntDesignVueResolver()],
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false })],
      }),
    ],
    resolve: {
      // 使用内部组件替换首页home-hero，home-Features组件
      alias: [
        {
          find: /^.*\/VPHomeHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/GlobalComponents.vue', import.meta.url),
          ),
        },
        {
          find: /^.*\/VPDocAsideOutline\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/Outline.vue', import.meta.url),
          ),
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/Footer.vue', import.meta.url),
          ),
        },
      ],
    },
  },
})
