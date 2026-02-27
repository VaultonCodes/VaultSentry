<script setup lang="ts">
import { watch } from 'vue';
import { useFullscreen } from '@vueuse/core';
import useGlobalStore from '@/stores/modules/global.ts';

const globalStore = useGlobalStore();
// @vueuse/core 处理是否全屏
const { isFullscreen, toggle } = useFullscreen();

watch(isFullscreen, () => {
  if (isFullscreen.value) {
    globalStore.setGlobalState('isFullScreen', true);
  } else {
    globalStore.setGlobalState('isFullScreen', false);
  }
});
</script>

<template>
  <!-- 全屏 -->
  <div
    class="vault-icon vault-scale-i h-36px w-36px flex flex-justify-center flex-items-center rounded-md hover:bg-[--el-header-toolbar-icon-hover-bg-color]"
    @click="toggle"
  >
    <ElTooltip :content="globalStore.isFullScreen === false ? '全屏' : '退出全屏'">
      <VaultGlobalIcon v-if="!globalStore.isFullScreen" name="vault-maximize" size="18" />
      <VaultGlobalIcon v-else name="vault-close-circle" size="18" />
    </ElTooltip>
  </div>
</template>

<style lang="scss" scoped></style>
