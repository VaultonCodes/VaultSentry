<script setup lang="ts" name="tabsDetailPage">
import { useRoute } from 'vue-router';
import useTabsStore from '@/stores/modules/tabs.ts';

const route = useRoute();
const tabsStore = useTabsStore();

tabsStore.setTabTitle(`VAULT.${route.params.id} - ${route.meta.title}`);
</script>

<template>
  <div class="p-4px">
    <span class="font-bold">Tab明细页</span>
    <div class="h-20px"></div>
    <span class="c-#646cff font-bold">params:{{ route.params }}</span>
  </div>
</template>
