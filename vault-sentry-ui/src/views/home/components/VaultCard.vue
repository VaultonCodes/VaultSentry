<script setup lang="ts">
// @ts-ignore
import { reactive } from 'vue';
import { CountTo } from 'vue3-count-to';

const cardList = reactive([
  { title1: '上月支付订单', unit: '月', value1: 6600, title2: '总订单数量', value2: 7000 },
  { title1: '上月退款订单', unit: '月', value1: 400, title2: '退款金额', value2: 8000 },
  { title1: '上月利润', unit: '月', value1: 66000, title2: '盈利', value2: 6666 },
  { title1: '上月添加用户', unit: '月', value1: 66, title2: '上月登录用户', value2: 300 }
]);
</script>

<template>
  <!-- 注意：如果不进行操作数组，使用index当key没有问题，若是数组会用来增删改查则不能使用index当key。 -->
  <ElCol v-for="(item, index) in cardList" :key="index" :span="6" :lg="6" :md="12" :sm="12" :xs="24">
    <ElCard class="rounded-md" shadow="hover">
      <div class="flex flex-justify-between">
        <span class="text-sm">{{ item.title1 }}</span>
        <ElTag :type="index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'warning' : 'danger'">
          {{ item.unit }}
        </ElTag>
      </div>
      <div class="text-2xl"><CountTo :start-val="0" :end-val="item.value1" :duration="2000"></CountTo></div>
      <ElDivider direction="horizontal" content-position="left"></ElDivider>
      <div class="flex flex-justify-between">
        <span class="text-sm">{{ item.title2 }}</span>
        <span><CountTo :start-val="0" :end-val="item.value2" :duration="2000"></CountTo></span>
      </div>
    </ElCard>
  </ElCol>
</template>

<style lang="scss" scoped></style>
