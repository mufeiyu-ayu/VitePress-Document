<script setup>

import { useRouter } from 'vitepress';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { Button as AButton } from 'ant-design-vue';
import data from '../utils/data';
import Font from './Font.vue';
const particlesInit = async engine => {
  //await loadFull(engine);
  await loadSlim(engine);
};

const particlesLoaded = async container => {

};
const scrollDistance = ref(500)

const router = useRouter()
const value = ref(
  'In your code, leave no room for doubt and regret, only comments and reflection.',
)

function btnClick() {
  router.go('/Web/')
}


</script>

<template>
  <div class="w-full h-full bg-purple">
    <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="data">
    </Particles>
    <div class="home absolute top-[40%] w-full  md:-mt-[64px] -mt-[64px] flex items-center justify-center">
      <div class="w-4/5 lg:w-1/2 h-1/2 absolute text-center flex flex-col justify-start items-">
        <div class="text-3xl lg:text-5xl italic font-blod">
          Black Cat's Document
        </div>

        <div class="ml-auto mr-auto mt-4 h-24 w-3/5 font-semibold lg:text-2xl">
          In your code, leave no room for doubt and regret, only comments and reflection
        </div>
        <div class="flex justify-center mt-8">
          <div class="btn" @click="btnClick">
            start
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style  scoped>
body {
  overflow: hidden;
}

canvas {
  height: 100% !important;
  display: block;
  vertical-align: bottom;
}

#tsparticles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/background.jpg) no-repeat center center;
  background-size: cover;
  background-color: black;
}
</style>
