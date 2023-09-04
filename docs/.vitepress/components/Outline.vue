<template>
  <a-tree
    v-model:selectedKeys="selectedKeys"
    :expanded-keys="expandedKeys"
    :tree-data="result"
    @expand="handleExpand"
    class="more"
  >
    <template #title="{ title, link, key }">
      <div class="tree">
        <a :href="link" class="more">{{ title }}</a>
      </div>
    </template>
  </a-tree>
</template>

<script setup>
import { ref, computed } from "vue";
import { getHeaders } from "../utils/outline";
import difference from "lodash-es/difference";
import { onContentUpdated } from "vitepress";
const expandedKeys = ref([]);
const selectedKeys = ref([]);
let result = ref([]);
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
  color: var(--vp-c-text-2);
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
