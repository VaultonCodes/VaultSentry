<template>
  <a-config-provider>
    <!-- 路由 -->
    <router-view />
    <!-- 偏好设置 -->
    <app-setting ref="appSettingRef" />
  </a-config-provider>
</template>

<script lang="ts" setup>
import AppSetting from '@/components/app/setting/index.vue';
import {  provide, ref } from 'vue';
import { openAppSettingKey } from '@/types/symbol';

// 对外暴露打开配置方法
const appSettingRef = ref();
provide(openAppSettingKey, () => {
  appSettingRef.value.open();
});

</script>
