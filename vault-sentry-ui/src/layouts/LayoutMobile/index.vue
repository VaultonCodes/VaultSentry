<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import settings from '@/settings.ts';
import VaultMobileDrawer from '@/components/VaultMobileDrawer/Index.vue';
import User from '@/layouts/components/Header/components/User.vue';
import Dark from '@/layouts/components/Header/components/Dark.vue';
import Logo from '@/layouts/components/Logo/index.vue';
import ColumnSubMenu from '@/layouts/components/Menu/ColumnSubMenu.vue';
import Main from '@/layouts/components/Main/index.vue';
import useAuthStore from '@/stores/modules/auth.ts';
import useGlobalStore from '@/stores/modules/global.ts';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate);
const menuList = computed(() => authStore.showMenuList);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
const mobileDrawer = ref(false);
</script>

<template>
  <ElContainer class="layout-container">
    <ElHeader class="layout-header flex flex-justify-between flex-items-center">
      <div class="w-30px flex flex-items-center">
        <VaultSvgIcon name="vault-mobile-menu" width="22" height="22" @click="mobileDrawer = true"></VaultSvgIcon>
      </div>
      <div class="h-100% flex flex-items-center">
        <!-- 明亮/暗黑模式图标 -->
        <Dark></Dark>
        <!-- 头像 AND 下拉折叠 -->
        <User></User>
      </div>
    </ElHeader>
    <!-- 路由页面 -->
    <Main></Main>
  </ElContainer>

  <!-- 左侧抽屉菜单 -->
  <VaultMobileDrawer v-model="mobileDrawer" style="width: 220px" placement="left">
    <div class="mobile-drawer transition-all">
      <Logo layout="mobile"></Logo>
      <ElScrollbar class="layout-scrollbar">
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <ElMenu
          :default-active="activeMenu"
          :collapse-transition="false"
          :unique-opened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <ColumnSubMenu :menu-list="menuList"></ColumnSubMenu>
        </ElMenu>
      </ElScrollbar>
    </div>
  </VaultMobileDrawer>
</template>

<style lang="scss" scoped>
.mobile-drawer {
  background-color: var(--el-menu-bg-color);
}
/** 去除菜单右侧边框 */
.el-menu {
  border-right: none;
}
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-header {
    height: $aside-header-height;
    overflow: hidden;
    background-color: var(--el-header-bg-color);
  }
}
.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}
</style>
