<script setup lang="ts">
import useGlobalStore from '@/stores/modules/global.ts';

const globalStore = useGlobalStore();

/** 切换图标 */
const handleToggleCollapse = () => {
  // 定义图标切换变量[true-折叠 false-展开]
  globalStore.isCollapse = !globalStore.isCollapse;
};
</script>

<template>
  <div
    class="vault-icon h-36px w-36px flex flex-justify-center flex-items-center rounded-md hover:bg-[rgba(0,0,0,0.06)] hover:dark-bg-[rgba(255,255,255,0.1)]"
    @click="handleToggleCollapse"
  >
    <ElIcon :size="20">
      <VaultSvgIcon v-if="!globalStore.isCollapse" name="vault-left" width="20px" height="20px"></VaultSvgIcon>
      <VaultSvgIcon v-if="globalStore.isCollapse" name="vault-right" width="20px" height="20px"></VaultSvgIcon>
    </ElIcon>
  </div>
</template>

<style lang="scss" scoped></style>
