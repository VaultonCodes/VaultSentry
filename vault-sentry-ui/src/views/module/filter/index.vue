<script setup lang="ts" name="filterPage">
import { ref } from 'vue';
const filterResult = ref({ state: '1', type: ['1', '3'] });

const changeFilter = (val: typeof filterResult.value) => {
  filterResult.value = val;
};

const filterData = [
  {
    title: '物流状态(单)',
    key: 'status',
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '已下单',
        value: '1',
        icon: 'ShoppingCart'
      },
      {
        label: '已发货',
        value: '2',
        icon: 'Van'
      },
      {
        label: '已签收',
        value: '3',
        icon: 'Edit'
      },
      {
        label: '已退回',
        value: '4',
        icon: 'Guide'
      },
      {
        label: '已完成',
        value: '5',
        icon: 'CircleCheck'
      }
    ]
  },
  {
    title: '商品类型(多)',
    key: 'type',
    multiple: true, // 多选标识
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '食品类',
        value: '1'
      },
      {
        label: '服装类',
        value: '2'
      },
      {
        label: '家具类',
        value: '3'
      },
      {
        label: '日用品类',
        value: '4'
      }
    ]
  }
];
</script>

<template>
  <div class="p-4px">
    <VaultTagFilter :data="filterData" :default-values="filterResult" @change="changeFilter" />
    <span class="result">返回值: {{ filterResult }}</span>
    <ElDescriptions class="result" title="配置项" :column="1" border>
      <ElDescriptionsItem label="data">需要筛选的数据列表，详情请查看代码</ElDescriptionsItem>
      <ElDescriptionsItem label="defaultValues">默认选择的值</ElDescriptionsItem>
    </ElDescriptions>
  </div>
</template>

<style scoped lang="scss">
.result {
  margin-top: 20px;
  font-size: 17px;
  font-weight: bold;
  color: var(--el-text-color-regular);
}
</style>
