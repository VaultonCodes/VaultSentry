<script setup lang="ts">
import { sessionStorage } from '@/utils/storage.ts';
import useGlobalStore from '@/stores/modules/global.ts';

const globalStore = useGlobalStore();
/** 刷新路由 */
const handleRefresh = () => {
  // 清除 sessionStorage
  sessionStorage.clear();
  // 清除 global store 数据[重置为初始状态]
  globalStore.$reset();
  window.location.reload();
};
</script>

<template>
  <!-- 刷新 -->
  <div
    class="vault-icon vault-rotate-i h-36px w-36px flex flex-justify-center flex-items-center rounded-md hover:bg-[--el-header-toolbar-icon-hover-bg-color]"
    @click="handleRefresh"
  >
    <ElTooltip content="刷新缓存">
      <VaultGlobalIcon name="vault-refresh-arrow" size="18" />
    </ElTooltip>
  </div>
</template>

<style lang="scss" scoped></style>
