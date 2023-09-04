<template>
  <div style="margin-bottom: 6px">大纲</div>
  <a-tree
    v-model:selectedKeys="selectedKeys"
    :expanded-keys="expandedKeys"
    :tree-data="result"
    @expand="handleExpand"
    class="more"
    :style="bgColor"
  >
    <template #title="{ title, link, key }">
      <div class="tree">
        <a :href="link" class="more">{{ title }}</a>
      </div>
    </template>
  </a-tree>
</template>

<script setup>
import { ref, watch } from "vue";
import { getHeaders } from "../utils/outline";
import difference from "lodash-es/difference";
import { onContentUpdated, useData } from "vitepress";
const { isDark } = useData();
const expandedKeys = ref([]);
const selectedKeys = ref([]);
const bgColor = ref("");
let result = ref([]);
if (localStorage.getItem("vitepress-theme-appearance") === "dark") {
  bgColor.value = { backgroundColor: "#1b1b1f" };
} else {
  bgColor.value = { backgroundColor: "#fff" };
}
watch(isDark, (newValue) => {
  if (newValue) {
    bgColor.value = { backgroundColor: "#1b1b1f" };
  } else {
    bgColor.value = { backgroundColor: "#fff" };
  }
});

onContentUpdated(() => {
  result.value = getHeaders();
});
const handleExpand = (keys, { expanded, node }) => {
  const tempKeys = (
    (node.parent ? node.parent.children : result.value) || []
  ).map(({ key }) => key);
  if (expanded) {
    expandedKeys.value = difference(keys, tempKeys).concat(node.key);
  } else {
    expandedKeys.value = keys;
  }
};
</script>

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
