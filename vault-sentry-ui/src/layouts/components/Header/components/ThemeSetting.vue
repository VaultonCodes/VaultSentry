<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts';

/** 打开主题配置 */
const handleThemeDialog = () => {
  mittBus.emit('handleThemeConfig');
};
</script>

<template>
  <!-- 设置 -->
  <div
    class="vault-icon vault-rotate-i h-36px w-36px flex flex-justify-center flex-items-center rounded-md hover:bg-[--el-header-toolbar-icon-hover-bg-color]"
    @click="handleThemeDialog"
  >
    <ElTooltip content="设置">
      <VaultGlobalIcon name="vault-setting" size="20" />
    </ElTooltip>
  </div>
</template>

<style lang="scss" scoped></style>
