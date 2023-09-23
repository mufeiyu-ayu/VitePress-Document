import { type } from '../../src/auto-imports';
<script setup>
const data = defineProps({
  imgSrc: {
    type: String,
  },
})
console.log(data)
</script>

<template>
  <img class="w-full  lg:h-[800px] h-[400px]" :src="imgSrc" alt="">
</template>
