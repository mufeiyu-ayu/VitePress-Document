import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  enhanceApp({ app }) {
    // Import the Ant Design CSS
    // ...
  },
  title: "Ayu",
  base: "/ayu",
  titleTemplate: "JiaJia",
  description: "黑猫警长的笔记文档",

  // 自定义源目录（自定义路由页面）
  lastUpdated: true,

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://img0.baidu.com/it/u=3581145158,1358465378&fm=253&fmt=auto&app=138&f=JPEG?w=320&h=320",
        // 这里使用本地图片老是报错，只能选择在线图片了
      },

      // { rel: "icon", href: "/logo.ico" },
    ],
  ],
  // 源目录，用于存放md文件
  srcDir: "./src",
  markdown: {
    lineNumbers: true, //开启代码行号显示 希望你可以帮助我们解决这些问题
  },

  themeConfig: {
    logo: "https://img0.baidu.com/it/u=477319750,4101262614&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=301", // 配置标题旁边的商标
    custom404: ["/404.md"], // 这里的路径要与你的默认页面路径匹配
    // 大纲
    outline: {
      label: "大纲",
      level: "deep",
    },
    //导航
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    // 侧边栏
    sidebar: [
      {
        text: "前端",
        items: [
          { text: "HTML", link: "/Html/html" },
          { text: "CSS", link: "/Css/css" },
          { text: "JavaScript", link: "/JavaScript/javaScript" },
          { text: "TypeScript", link: "/Typescript/index" },
          { text: "Vue", link: "/Vue/Vue" },

          { text: "Eprw", link: "/eprw" },
          { text: "Frames Default", link: "/frames/default" },
        ],
      },
      {
        text: "工具",
        items: [],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/mufeiyu-ayu" }],
    footer: {
      message: "邮箱：2382839439 个人微信号:jiaxiaoyi825",
      copyright: "Copyright © 2019-present Evan You",
    },
    // 上一页下一页
    docFooter: {
      prev: "道行太浅，回去修炼吧！！！",
      next: "它丫的，继续冲",
    },
    editLink: {
      pattern: "https://github.com/mufeiyu-ayu",
      text: "Edit this page on GitHub",
    },
    // 最后一次更新
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    search: {
      provider: "local",
    },
  },
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    resolve: {
      // 使用内部组件替换首页home-hero，home-Features组件
      alias: [
        {
          find: /^.*\/VPHomeHero\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/GlobalComponents.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPHomeFeatures\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/Test.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPDocAsideOutline\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/Outline.vue", import.meta.url)
          ),
        },
      ],
    },
    optimizeDeps: {
      include: ["ant-design-vue"],
    },
  },
});
