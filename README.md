# VitePress

基于 VitePress 搭建的博客网站

### 提醒

由于不是参照最新 vitepress 的官网，所以可能会有些许差异，参照文档[Vitepress](https://vitepress.dev/)

### 项目心得

1. 个人对于 vitepress 框架的大纲组件([VPCDocOutlineItem.vue](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDocOutlineItem.vue))不是很满意，大纲并没有考虑标题过多过深的情况，只有简单的配置项去规定大纲的深度和显示与否，可当 md 文件字数过多时，假设有很多标题，并且都有承上启下的作用，那么读者以及作者本人并不能清晰的去查阅，简单来说就是缺少类似 Component tree，虽然文档提到可以自定义主题，然后将写好的主题与官方的 vue 文件进行切换即可，但是我在切换过程中遇到无法获取当前页面 md 文件信息的情况，官方也并没有给出详细文档介绍，因此我直接在源码重写了 VPDocOutlineItem 组件，在此的基础上引入了 antDesign 的树型组件，虽然遇到很多 bug，比如 vitepress 固有的生命周期，让我艰难的获取数据，修改数据，，，不过好在成功封装
2. 持续创造中
