<template>
  <div class="">测试组件</div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const headers = [
    ...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)"),
  ];
  console.log(headers, 122211);
});
</script>

<style lang="scss" scoped></style>
