<template>
  <div class="bg-container">
    <div class="bg-container-author">
      <div class="autho-title">
        <div class="bg-blue-500 text-white p-4">
          这是一个使用 Tailwind CSS 样式的内容块。
        </div>
      </div>
    </div>
  </div>
  <div>1111</div>
</template>

<script setup lang="ts">
import {} from "vue";

function btnClick() {
  window.location.href = "/ayu/Html/html";
}
</script>

<style lang="scss">
.bg-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("./bg.jpg") no-repeat center center;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.258); /* 半透明的背景色 */
  }
  .bg-container-author {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    text-align: center;
    background-color: pink;
  }
}
</style>
