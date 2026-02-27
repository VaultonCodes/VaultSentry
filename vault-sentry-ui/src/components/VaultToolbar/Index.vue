<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { Aim, FullScreen } from '@element-plus/icons-vue';
import useGlobalStore from '@/stores/modules/global.ts';

interface IToolbarProps {
  showSearch?: boolean;
  showMaximize?: boolean;
}

const props = withDefaults(defineProps<IToolbarProps>(), {
  showSearch: true,
  showMaximize: true
});

const emits = defineEmits(['update:showSearch', 'refreshTable']);

const globalStore = useGlobalStore();

/** 点击子组件，调用父组件方法 */
const toggleSearch = () => {
  // 同步修改父子组件的值，但是父组件需要使用v-model:showSearch="showSearch"
  // @ts-ignore
  emits('update:showSearch', !props.showSearch);
};

/** 点击子组件，调用父组件方法 */
const handleRefresh = () => {
  emits('refreshTable');
};

/** 全屏切换 */
const handleMaximize = () => {
  globalStore.setGlobalState('maximize', !globalStore.maximize);
  // 触发窗口resize事件，让表格自适应
  nextTick(() => {
    const event = new Event('resize');
    window.dispatchEvent(event);
  });
};

/** 是否全屏状态 */
const isMaximize = computed(() => globalStore.maximize);
</script>

<template>
  <!-- 使用方式：<KoiToolbar v-model:showSearch="showSearch" @refreshTable="handleTableData"></KoiToolbar> -->
  <!-- 不显示全屏按钮 :showMaximize="false" -->
  <div class="koi-toolbar">
    <ElRow>
      <ElTooltip :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <ElButton circle icon="search" @click="toggleSearch()" />
      </ElTooltip>
      <ElTooltip content="刷新" placement="top">
        <ElButton circle icon="refresh" @click="handleRefresh()" />
      </ElTooltip>
      <ElButton v-if="showMaximize" circle @click="handleMaximize()">
        <ElIcon v-if="!isMaximize"><FullScreen /></ElIcon>
        <ElIcon v-else><Aim /></ElIcon>
      </ElButton>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.koi-toolbar {
  margin-left: auto;
}
</style>
