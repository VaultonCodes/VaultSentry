<script setup lang="ts">
import { useTheme } from '@/utils/theme.ts';
import useGlobalStore from '@/stores/modules/global.ts';

const globalStore = useGlobalStore();
const { switchDark } = useTheme();

defineProps({
  size: {
    type: Number,
    default: 20
  }
});

/** 暗黑主题和明亮主题切换 */
const handleSwitchDark = async (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  // 画圆
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // @ts-ignore
  if (document.startViewTransition == undefined) {
    /** 明亮和暗黑模式核心逻辑 */
    // 定义图标切换变量(true-月亮，false-太阳)
    globalStore.setGlobalState('isDark', !globalStore.isDark);
    switchDark();
    /** 明亮和暗黑模式核心逻辑 */
  } else {
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      /** 明亮和暗黑模式核心逻辑 */
      // 定义图标切换变量(true-月亮，false-太阳)
      globalStore.setGlobalState('isDark', !globalStore.isDark);
      switchDark();
      /** 明亮和暗黑模式核心逻辑 */
    });
    await transition.ready;
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: globalStore.isDark ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: globalStore.isDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    );
  }
};
</script>

<template>
  <div
    class="vault-icon vault-scale-i h-36px w-36px flex flex-justify-center flex-items-center rounded-md hover:bg-[--el-header-toolbar-icon-hover-bg-color]"
    @click="handleSwitchDark"
  >
    <!-- 明亮模式 -->
    <ElTooltip v-if="!globalStore.isDark" content="明亮模式">
      <VaultGlobalIcon name="vault-moon-side" size="18" />
    </ElTooltip>
    <!-- 暗黑模式 -->
    <ElTooltip v-if="globalStore.isDark" content="暗黑模式">
      <VaultGlobalIcon name="vault-sun-side" size="20" />
    </ElTooltip>
  </div>
</template>

<style lang="scss" scoped></style>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
