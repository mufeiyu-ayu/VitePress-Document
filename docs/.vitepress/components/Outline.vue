<script setup>
import { Tree as ATree } from 'ant-design-vue'
import difference from 'lodash-es/difference'
import store from 'storejs'
import { onContentUpdated, useData } from 'vitepress'
import { getHeaders } from '../utils/outline'

const { isDark } = useData()
const expandedKeys = ref([])
const selectedKeys = ref([])
const bgColor = ref('')
const result = ref([])

if (store.get('vitepress-theme-appearance') === 'dark')
	bgColor.value = { backgroundColor: '#1b1b1f' }
else
	bgColor.value = { backgroundColor: '#fff' }

watch(isDark, (newValue) => {
	if (newValue)
		bgColor.value = { backgroundColor: '#1b1b1f' }
	else
		bgColor.value = { backgroundColor: '#fff' }
})

onContentUpdated(() => {
	result.value = getHeaders()
})
function handleExpand(keys, { expanded, node }) {
	const tempKeys = (
		(node.parent ? node.parent.children : result.value) || []
	).map(({ key }) => key)
	if (expanded)
		expandedKeys.value = difference(keys, tempKeys).concat(node.key)
	else
		expandedKeys.value = keys
}
</script>

<template>
	<div style="margin-bottom: 6px; color: #b0b0b0; font-size: 14px">
		{{ result.length ? '大纲' : '' }}
	</div>
	<ATree v-model:selectedKeys="selectedKeys" :expanded-keys="expandedKeys" :tree-data="result" class="more"
		:style="bgColor" @expand="handleExpand">
		<template #title="{ title, link, key }">
			<div class="tree">
				<a :href="link" class="more">{{ title }}</a>
			</div>

		</template>
	</ATree>
</template>

<style lang="scss" scoped>
.tree {
	width: 200px;
}

a {
	width: 190px;
	display: block;
	line-height: 28px;
	color: #b0b0b0;
	transition: color 0.5s;
	font-weight: 400;
}

.more {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.more:hover {
	color: blueviolet;
}
</style>
