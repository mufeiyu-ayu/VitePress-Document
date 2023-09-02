<template>
  <div>这是我自己定义的页面样式</div>
  <Content />
</template>
<script setup>
import { ref, onMounted } from "vue";
// Special api to mount the app
import { createApp } from "whyframe:app";

const el = ref();

onMounted(() => {
  // Mount the app to the ref
  createApp(el.value);
});
</script>
