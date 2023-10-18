<script setup>
import { useRouter } from 'vitepress';
import { data } from '../utils/post.data';

const list = ref([])
const router = useRouter()
data.forEach((element, index) => {
  if (element.frontmatter.des) {
    element.frontmatter.url = element.url
    list.value.push(element.frontmatter)
  }
})
function routerLink(url) {
  console.log(url)
  router.go(url)
}
const add = () => {
  console.log(11)
}
</script>

<template>
  <!-- <div class="h-[800px]" @click="add">
    <div class="lg:w-3/5 w-full m-auto">
      <div class="text-4xl lg:text-9xl italic text-center text-[#fff] bg-[#16a34a]">
        Recent Blogs
      </div>
      <div class="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        <div v-for="item in list" :key="item" class="bg-[#fff] aa rounded-lg" @click="routerLink(item.url)">
          <img :src="item.img" class="w-full h-48 cursor-pointer" alt="11">
          <div class="text-2xl">
            {{ item.title }}
          </div>
          <div class="line-clamp-2">
            {{ item.des }}
          </div>
          <div class="flex text-[xl] space-x-3 leading-[30px] mt-2">
            <div class="cursor-pointer">
              111
            </div>
            <div class="cursor-pointer">
              <span class="iconfont size">&#xe61d;</span>
              <span>&nbsp;{{ item.Collection }}</span>
            </div>

            <div>
              <span class="iconfont size">&#xec7f;</span>
              <span>&nbsp;{{ item.like }}</span>
            </div>
            <div class="cursor-pointer">
              <span class="iconfont size">&#xe666;</span>
              <span>&nbsp;{{ item.Comment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.size {
  font-size: 30px;
  vertical-align: bottom;
}

.aa {
  transition: transform 0.3s ease !important;
}

.aa:hover {
  transform: scale(1.03) !important;
}
</style>


