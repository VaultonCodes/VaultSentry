<script setup lang="ts" name="controlsPage">
import { MsgSuccess, MsgWarning } from '@/utils/message.ts';

const handleDebounce = () => {
  MsgSuccess('防抖');
};

const handleThrottle = () => {
  MsgWarning('节流');
};
</script>

<template>
  <div class="p-4px">
    <ElButton v-debounce:1000="handleDebounce" type="primary" icon="Present" plain>防抖</ElButton>
    <ElButton v-throttle:3000="handleThrottle" type="warning" icon="AlarmClock" plain>节流</ElButton>
    <div class="h-20px"></div>
    <div class="h-20px"></div>
    <div v-waterMarker="{ text: 'YU-ADMIN', textColor: '#D9D9D9' }" class="h-60px w-500px bg-gray-100">水印指令</div>
  </div>
</template>

<style scoped></style>
