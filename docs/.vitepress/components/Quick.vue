<template>
	<div class=""></div>
</template>

<script setup>
import {useData} from 'vitepress'
import {data} from '../utils/post.data'
data.forEach((element, index) => {
	if (element.url === '/Web/HTML/html.html') {
		console.log(element)
	}
})
</script>

<style lang="scss" scoped></style>
