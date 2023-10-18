<script setup>

import { useRouter } from 'vitepress';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
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
  router.go('/Web/Tagml/index')
}


</script>

<template>
  <div>
    <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="data" />


    <div class="home w-full h-screen relative md:-mt-[64px] -mt-[64px] flex items-center justify-center">

      <div class="w-4/5 lg:w-1/2 h-1/2 absolute text-center flex flex-col justify-start items-">
        <div class="text-3xl animate__heartBeat lg:text-7xl italic font-blod">
          Black Cat's Document
        </div>
        <Font :value="value" class="ml-auto mr-auto mt-4 h-24" />
        <div class="flex justify-center mt-8">
          <div class="btn" @click="btnClick">
            start
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aa {
  width: 300px;
  height: 300px;
  background-color: red;
  position: relative;
}

.start::before {
  left: 20%;
  top: 20%;
  position: absolute;
  display: block;
  content: '\e86e';
  font-family: 'iconfont';
}

.github::before {
  left: 15%;
  top: 20%;
  position: absolute;
  display: block;
  content: '\e85a';
  font-family: 'iconfont';
}


canvas {
  display: block;
  vertical-align: bottom;
}

#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;

  background: {
    image: url(https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/background.jpg);
    position: bottom;
    repeat: no-repeat;
    color: black;
    size: cover;
  }
}

.text {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  color: white;
  max-width: 90%;
  padding: 2em 3em;
  background: rgba(0, 0, 0, 0.75);
  text-shadow: 0px 0px 2px #131415;
  font-family: "Open Sans", sans-serif;
}

h1 {
  font-size: 2.25em;
  font-weight: 700;
  letter-spacing: -1px;
}

a,
a:visited {
  color: #e34234;
  transition: 0.25s;
}

a:hover,
a:focus {
  color: #ba160c;
}
</style>
