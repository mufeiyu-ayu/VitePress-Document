<template>
	<div class="w-3/5">
		<span
			class="font-semibold lg:text-2xl"
			v-for="(char, index) in displayedText"
			:key="index"
			>{{ char }}</span
		>
	</div>
</template>

<script setup>
const data = defineProps({
	value: String,
})
const element = ref(null)

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
	}
}
function stopTimer() {
	if (timer) {
		clearInterval(timer)
	}
}
onMounted(() => {
	typeText()
})

onBeforeUnmount(() => {
	stopTimer()
})
</script>
