<template>
  <!-- 如果页面路由是frames/default的话，则使用自定义布局，反之使用默认主题-->
  <FrameDefaultLayout v-if="route.path.startsWith('/ayu/frames/default')" />
  <Theme.Layout v-else />
</template>

<script setup>
import { useRoute } from "vitepress";
import Theme from "vitepress/theme";
// the default layout we'll create next
import FrameDefaultLayout from "./FrameDefaultLayout.vue";

const route = useRoute();
</script>

<style>
div.hel {
  float: left;
}
</style>
