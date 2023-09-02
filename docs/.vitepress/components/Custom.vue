<template>
  <div class="">
    <div>自定义大纲组件</div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
const { frontmatter, theme } = useData();
console.log(frontmatter.value);
</script>
