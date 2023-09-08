<template>
	<div>
		<div
			class="home w-full h-screen relative md:-mt-[64px] -mt-[64px] flex items-center justify-center"
		>
			<img
				class="w-full h-full object-cover"
				src="https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
				alt=""
			/>
			<div
				class="w-4/5 lg:w-1/2 h-1/2 absolute text-center flex flex-col justify-start items-"
			>
				<div class="text-3xl lg:text-5xl text-[#2563eb] font-blod">
					Black Cat's Document
				</div>
				<Font :value="value" class="ml-auto mr-auto mt-6 h-24" />
				<div class="flex justify-around lg:px-32">
					<a-button type="primary" size="large" class="start w-36" href="Web/"
						>start</a-button
					>
					<a-button type="primary" danger size="large" class="github w-36"
						>GitHub</a-button
					>
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
