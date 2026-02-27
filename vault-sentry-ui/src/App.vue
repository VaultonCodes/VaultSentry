<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue';
import { getBrowserLang } from '@/utils/index.ts';
import { useTheme } from '@/utils/theme.ts';
// import { autoRefresh } from "@/utils/autoUpdate.ts";

import useGlobalStore from '@/stores/modules/global.ts';
const globalStore = useGlobalStore();

const dimension = computed(() => globalStore.dimension);
const { initThemeConfig } = useTheme();

onMounted(() => {
  // 初始化主题配置
  handleThemeConfig();
  // 自动检测更新
  // handleAutoUpdate();
  // 开发环境打印项目名称
  console.log(
    `%c VAULT-ADMIN %c V1.0.0 `,
    'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #6169FF; font-weight: bold;',
    'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;'
  );
});

/** 初始化主题配置 */
const handleThemeConfig = () => {
  nextTick(() => {
    initThemeConfig();
  });
};

/** 自动检测更新 */
// const handleAutoUpdate = () => {
//   nextTick(() => {
//     if (import.meta.env.VITE_ENV === "production") autoRefresh();
//   });
// };
</script>

<template>
  <ElConfigProvider :size="dimension">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<style scoped></style>
