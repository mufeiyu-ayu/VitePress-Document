<template>
	<div class="lg:w-3/5 w-full h-[800px] m-auto bg-tahiti">
		<div class="text-4xl lg:text-9xl italic text-[#00BFFF] text-center">
			Recent Blogs
		</div>
		<div class="w-full lg:h-80 h-28 flex justify-space">
			<!-- 文章信息 -->
			<div class="h-full lg:w-2/3 w-4/6 bg-purple">
				<div class="font-black lg:text-5xl text-xl">简单吃透vue数据劫持</div>
				<div class="lg:text-3xl text-xs lg:h-2/3 h-16 line-clamp-4 bg-silver">
					前言：众所周知vue2是通过Object.defineProperty,vue3通过proxy实现对于数据也就是data的劫持，然后监听数据的变化也就是响应式，从而让页面与数据保持同步刷新，今天和大家聊一下vue2中数据劫持，通过原生实现让大家彻底搞懂，彻底了解，并且轻松过面试嘻嘻1111
				</div>
				<div>
					<!-- <span>时间:10月前</span>
					<span>浏览量:510</span>
					<span>点赞:16</span>
					<span>回复7</span> -->
				</div>
			</div>
			<!-- 图片 -->
			<div class="h-full lg:w-1/3 w-2/6 bg-midnight">
				<img
					class="h-full"
					src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6079dd8bc6ca4334af1aafc508e336fa~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.awebp"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
