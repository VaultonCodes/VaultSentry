<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  isExpanded?: boolean;
  showSearch?: boolean;
}>();

const showExpanded = ref(false);

/* 是否展开搜索表单 */
const handleExpanded = () => {
  showExpanded.value = !showExpanded.value;
};

onMounted(() => {
  if (props.isExpanded !== undefined) {
    showExpanded.value = props.isExpanded;
  }
});
</script>

<template>
  <Transition name="el-zoom-in-bottom">
    <div v-show="props.showSearch" class="vault-search">
      <div
        class="flex flex-items-center p-b-12px transition-500 transition-ease-in-out hover:text-[--el-color-primary]"
        @click="handleExpanded"
      >
        <ElIcon :size="14" class="transition-500 transition-ease-in-out" :class="{ 'rotate-180': showExpanded }">
          <ArrowDown />
        </ElIcon>
        <div class="m-l-6px select-none text-15px">搜索</div>
      </div>

      <ElCollapseTransition>
        <slot v-if="showExpanded"></slot>
      </ElCollapseTransition>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.vault-search {
  @apply m-x-6px m-t-5px overflow-hidden p-x-20px p-t-12px p-b-0 bg-#FFF text-#303133 border-1px border-solid border-#E5E7ED dark:border-#414243 dark:bg-#1D1E1F dark:text-#CFD3DC rounded-8px;
}
</style>
