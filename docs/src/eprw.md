---
title: 页面标题
lang: en-US
# titleTemplate: Vite111 可结合title 覆盖默认config.title
# desription:vitepress
# navbar: false  是否显示导航栏，默认true type：bol
# sidebar: false 是否显示侧边栏 默认true type：bol
# aside: false 中心内容是否偏移 默认true type bol|'left'
# outline:2

pageClass: root
---

[跳转到 examples 链接](/api-examples) <!-- sends the user to index.html of directory foo -->
你在干嘛呢

---

<script setup>
  // 导入自定义组件
import CustomComponent from './components/CustomComponent.vue'
</script>

# Docs

This is a .md using a custom component
<CustomComponent />