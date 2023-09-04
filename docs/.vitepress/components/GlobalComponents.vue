<template>
  <div class="bg-container">
    <div class="bg-container-author">
      <div class="autho-title">
        <a-button type="primary" @click="btnClick">跳转页面</a-button>
      </div>
    </div>
  </div>
  <div>1111</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vitepress";
import handleMouseWheel from "../utils/scroll";
import throttle from "../utils/throttle ";
const scrollDistance = ref(500);
const router = useRouter();
function btnClick() {
  router.go("/Web/Html/html");
}

window.addEventListener(
  "wheel",
  throttle(function (event) {
    if (!location.href.endsWith("/ayu/")) return;
    handleMouseWheel(scrollDistance, event);
  }, 600)
);
// 滚动距离，默认为0
</script>

<style lang="scss">
.bg-container {
  position: relative;
  top: -64px;
  width: 100%;
  height: 100vh;
  background: url("https://s2.loli.net/2023/09/04/Hz3xOTlDLrCAGIV.jpg")
    no-repeat center center;
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
    // background-color: pink;
  }
}
</style>
