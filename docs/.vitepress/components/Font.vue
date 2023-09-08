<template>
	<div class="w-3/5">
		<span
			class="text-#1c1917 font-light"
			v-for="(char, index) in displayedText"
			:key="index"
			>{{ char }}</span
		>
	</div>
</template>

<script setup>
import {ref, onMounted, defineProps, onBeforeUnmount} from 'vue'
const data = defineProps({
	value: String,
})

// 这里设置你的文本值
const displayedText = ref('')
const isErasing = ref(false)
let charIndex = 0
let timer = null
const typeText = () => {
	if (!isErasing.value) {
		if (charIndex < data.value.length) {
			displayedText.value += data.value.charAt(charIndex)
			charIndex++
			timer = setTimeout(typeText, 100)
		} else {
			isErasing.value = true
			timer = setTimeout(typeText, 1000)
		}
	} else {
		if (charIndex > 0) {
			displayedText.value = displayedText.value.slice(0, -1)
			charIndex--
			setTimeout(typeText, 200)
		} else {
			isErasing.value = false
			setTimeout(typeText, 500)
		}
	}
}
function stopTimer() {
	if (timer) {
		clearInterval(timer)
	}
}
onMounted(() => {
	// typeText()
})

onBeforeUnmount(() => {
	stopTimer()
	console.log('清除定时器')
})
</script>
