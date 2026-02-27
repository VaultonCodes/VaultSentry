<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MsgSuccess } from '@/utils/message.ts';
import useGlobalStore from '@/stores/modules/global.ts';

const globalStore = useGlobalStore();
const dimension = computed(() => globalStore.dimension);

const dimensionList = ref<any>([]);

const handleSwitchLanguage = () => {
  dimensionList.value = [
    { label: '默认', value: 'default' },
    { label: '大型', value: 'large' },
    { label: '小型', value: 'small' }
  ];
};

/** 监听 globalStore.language 的变化 */
watch(
  () => globalStore.language,
  () => {
    // 当 language 变化时，手动触发 dimensionList 的更新
    handleSwitchLanguage();
  }
);

const handleDimension = (item: string) => {
  if (dimension.value === item) return;
  globalStore.setDimension(item);
  MsgSuccess('成功');
};
</script>

<template>
  <ElTooltip placement="left" content="组件大小">
    <div
      class="vault-flip-i h-36px w-36px flex flex-justify-center flex-items-center rounded-md hover:bg-[--el-header-toolbar-icon-hover-bg-color]"
    >
      <ElDropdown @command="handleDimension">
        <VaultGlobalIcon name="vault-convert-cube" size="18" class="vault-icon" />
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem
              v-for="item in dimensionList"
              :key="item.value"
              :command="item.value"
              :disabled="dimension === item.value"
            >
              {{ item.label }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </ElTooltip>
</template>

<style lang="scss" scoped></style>
