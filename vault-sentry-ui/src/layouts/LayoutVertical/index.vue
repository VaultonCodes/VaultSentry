<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import settings from '@/settings.ts';
import Logo from '@/layouts/components/Logo/index.vue';
import Header from '@/layouts/components/Header/index.vue';
import AsideSubMenu from '@/layouts/components/Menu/AsideSubMenu.vue';
import Main from '@/layouts/components/Main/index.vue';
import useAuthStore from '@/stores/modules/auth.ts';
import useGlobalStore from '@/stores/modules/global.ts';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

console.log('纵向布局左侧动态路由', authStore.showMenuList);

// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate);
const menuList = computed(() => authStore.showMenuList);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
// const menuHoverCollapse = ref(settings.asideMenuHoverCollapse);
</script>

<template>
  <ElContainer class="layout-container">
    <ElAside
      class="layout-aside transition-all"
      :style="{ width: !globalStore.isCollapse ? globalStore.menuWidth + 'px' : settings.asideMenuCollapseWidth }"
    >
      <Logo :is-collapse="globalStore.isCollapse" :layout="globalStore.layout"></Logo>
      <ElScrollbar class="layout-scrollbar">
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <ElMenu
          :default-active="activeMenu"
          :collapse="globalStore.isCollapse"
          :collapse-transition="false"
          :unique-opened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <AsideSubMenu :menu-list="menuList"></AsideSubMenu>
        </ElMenu>
      </ElScrollbar>
    </ElAside>
    <ElContainer>
      <ElHeader class="layout-header">
        <Header></Header>
      </ElHeader>
      <!-- 路由页面 -->
      <Main></Main>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-aside {
    padding-right: $aside-menu-padding-right; // 左侧布局右边距[用于悬浮和选择更明显]
    padding-left: $aside-menu-padding-left; // 左侧布局左边距[用于悬浮和选择更明显]
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-right-color);
  }
  .layout-header {
    height: $aside-header-height;
    background-color: var(--el-header-bg-color);
  }
}

/** 去除菜单右侧边框 */
.el-menu {
  border-right: none;
}

.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}
</style>
