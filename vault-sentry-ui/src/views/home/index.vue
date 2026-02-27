<script setup lang="ts" name="homePage">
import { onMounted } from 'vue';
import { getDayText } from '@/utils/random.ts';
import { MsgSuccess } from '@/utils/message.ts';

onMounted(() => {
  // 时间问候语
  MsgSuccess(getDayText());
});
</script>

<template>
  <div class="m-x-6px m-y-5px overflow-x-hidden">
    <ElCard class="rounded-md" shadow="hover">
      <div v-waterMarker="{ text: 'VAULT-ADMIN', textColor: '#D9D9D9' }" class="flex flex-items-center">
        <img
          class="user-avatar h-60px w-60px select-none rounded-full"
          src="https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_1440w.webp"
          alt="avatar"
        />
        <div class="p-l-20px">
          <div class="whitespace-nowrap p-b-8px font-bold">
            <span>VAULT-ADMIN/</span>
          </div>
          <div class="whitespace-nowrap font-bold">君可愿白衣饮茶，清风瘦马，再听一曲六月雨下。</div>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped></style>
