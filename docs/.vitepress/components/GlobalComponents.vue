<template>
	<div>
		<div
			class="home w-full h-screen relative md:-mt-[64px] -mt-[64px] flex items-center justify-center"
		>
			<img
				class="w-full h-full object-cover"
				src="https://w.wallhaven.cc/full/e7/wallhaven-e7jj6r.jpg"
				alt=""
			/>
			<div
				class="w-4/5 lg:w-1/2 h-1/2 absolute text-center flex flex-col justify-start items-"
			>
				<div
					class="text-3xl animate__heartBeat lg:text-5xl italic text-[#D098B6 ] font-blod"
				>
					Black Cat's Document
				</div>
				<Font :value="value" class="ml-auto mr-auto mt-6 h-24" />
				<div class="flex justify-center">
					<div class="btn" @click="btnClick">start</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import Quick from './Quick.vue'
import {ref} from 'vue'
import {useRouter} from 'vitepress'
import handleMouseWheel from '../utils/scroll'
import throttle from '../utils/throttle'
import Font from './Font.vue'
import {Button as AButton} from 'ant-design-vue'

const scrollDistance = ref(500)

const router = useRouter()
const value = ref(
	'In your code, leave no room for doubt and regret, only comments and reflection.',
)

function btnClick() {
	router.go('/Web/Tagml/index')
}

// window.addEventListener(
//   "wheel",
//   throttle(function (event) {
//     if (!location.href.endsWith("/ayu/")) return;
//     handleMouseWheel(scrollDistance, event);
//   }, 600)
// );
</script>

<style>
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
</style>
