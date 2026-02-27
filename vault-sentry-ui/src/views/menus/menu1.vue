<script setup lang="ts" name="menu1Page">
import { ref } from 'vue';

const value = ref<string>('');

// defineOptions({
//   name: "menu1Page"
// });
</script>

<template>
  <div class="p-4px">
    <span>MENU1</span>
    <ElInput v-model="value" placeholder="测试缓存MENU1"></ElInput>
  </div>
</template>
