<script setup lang="ts">
import { computed, ref } from 'vue';
import settings from '@/settings';
import logoUrl from '@/assets/images/logo/logo.webp';

// 接收父组件传递的参数
const props = defineProps({
  isCollapse: {
    require: false, // true显示，false隐藏
    type: Boolean
  },
  layout: {
    require: 'vertical', // 布局模式[纵向：vertical | 分栏：columns | 经典：classic | 上左：optimum | 横向：horizontal]
    type: String
  }
});

const titleSize = ref(`${settings.loginTitleSize}px`);
const showLogo = ref(settings.logoShow);
const logoSize = ref(settings.logoSize);
const titleAnimate = ref(settings.logoTitleAnimate);

// Logo 容器样式计算属性
const logoContainerStyle = computed(() => ({
  width: logoSize.value,
  height: logoSize.value
}));

// Logo 容器类名计算属性
const logoContainerClass = computed(() => {
  const baseClass = 'rounded-full';
  switch (props.layout) {
    case 'classic':
      return `${baseClass} m-l--14px`;
    case 'horizontal':
      return `${baseClass} m-l-6px`;
    default:
      return baseClass;
  }
});

// 标题容器类名计算属性
const titleClass = computed(() => {
  const baseClass = `truncate select-none ${titleAnimate.value}`;
  switch (props.layout) {
    case 'horizontal':
      return `${baseClass} w-155px m-x-10px`;
    case 'classic':
      return `${baseClass} w-155px m-x-10px`;
    default:
      return `${baseClass} flex-1 m-l-10px`;
  }
});

// 标题样式计算属性
const titleStyle = computed(() => {
  const baseStyle = { 'font-size': titleSize.value };
  if (props.layout === 'horizontal' || props.layout === 'classic') {
    return {
      ...baseStyle,
      color: 'var(--el-header-logo-text-color) !important'
    };
  }
  return {
    ...baseStyle,
    color: 'var(--el-aside-logo-text-color) !important'
  };

  return baseStyle;
});
</script>

<template>
  <div v-show="showLogo" class="vault-logo flex flex-items-center p-l-5px">
    <!-- Logo 图片 -->
    <div class="rounded-full" :class="logoContainerClass" :style="logoContainerStyle">
      <ElImage :src="logoUrl" fit="cover" class="h-100% w-100% rounded-full">
        <template #error>
          <ElIcon class="h-100% w-100% rounded-full text-[--el-color-primary]" :size="34">
            <CircleCloseFilled />
          </ElIcon>
        </template>
      </ElImage>
    </div>

    <!-- 标题文字 -->
    <ElTooltip content="VaultSentry" :show-after="1500" placement="right">
      <div
        v-show="!props.isCollapse"
        class="select-none truncate"
        :class="titleClass"
        :style="titleStyle"
        v-text="VaultSentry"
      >
      </div>
    </ElTooltip>
  </div>
</template>

<style lang="scss" scoped>
.vault-logo {
  height: $aside-header-height;
  line-height: $aside-header-height;
}
</style>
