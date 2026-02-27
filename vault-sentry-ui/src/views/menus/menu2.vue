<script setup lang="ts" name="menu3Page">
import { ref } from 'vue';

const value = ref<string>('');
</script>

<template>
  <div class="p-4px">
    <span>MENU2</span>
    <ElInput v-model="value" placeholder="测试缓存MENU2"></ElInput>
  </div>
</template>
