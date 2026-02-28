<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue';
import { ElMessageBox } from 'element-plus';
import { MsgWarning } from '@/utils/message.ts';

// 定义参数的类型
interface IDrawerProps {
  title?: string;
  visible?: boolean;
  size?: number | string;
  destroyOnClose?: boolean;
  closeOnClickModel?: boolean;
  confirmText?: string;
  cancelText?: string;
  direction?: any;
  loading?: boolean;
  footerHidden?: boolean; // 是否隐藏确认和取消按钮部分
}

// 子组件接收父组件的值
// withDefaults：设置默认值  defineProps：接收父组件的参数
const props = withDefaults(defineProps<IDrawerProps>(), {
  title: 'Drawer',
  visible: false,
  size: '450',
  closeOnClickModel: false,
  destroyOnClose: false,
  confirmText: '',
  cancelText: '',
  direction: 'rtl',
  loading: false,
  footerHidden: false
});

// 开关变量
const visible = ref(false);
// 确定按钮Loading，此处必须用toRefs，否则将失去响应式
const { loading } = toRefs(props);
const confirmLoading = ref(loading);

// 响应式窗口宽度
const windowWidth = ref(window.innerWidth);

// 监听窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// 计算抽屉大小
const drawerSize = computed(() => {
  // 将size转换为数值（去掉可能的单位）
  const sizeValue = Number.parseFloat(String(props.size));

  // 处理不同方向的情况
  const isHorizontal = props.direction === 'ltr' || props.direction === 'rtl';

  if (isHorizontal) {
    // 水平方向（左右抽屉）：比较宽度
    if (windowWidth.value < 600) {
      return '86%';
    }

    // 如果抽屉宽度大于窗口宽度，使用86%
    if (sizeValue > windowWidth.value) {
      return '86%';
    }

    // 如果抽屉宽度大于窗口宽度的90%，使用90%
    if (sizeValue > windowWidth.value * 0.9) {
      return '90%';
    }
  } else {
    // 垂直方向（上下抽屉）：比较高度
    // 对于垂直抽屉，我们通常不会设置百分比，但可以根据需要调整
    if (windowWidth.value < 600) {
      // 小屏幕下，垂直抽屉使用更小的高度
      return '60%';
    }
  }

  // 返回原始size（可能是字符串或数字）
  return props.size;
});

// 组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

/** 打开抽屉 */
const open = () => {
  visible.value = true;
};

/** 关闭抽屉 */
const close = () => {
  if (!props.closeOnClickModel) {
    ElMessageBox.confirm('您确认进行关闭么？', '温馨提示：', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        visible.value = false;
        MsgWarning('已关闭');
      })
      .catch(() => {
        MsgWarning('已取消');
      });
  } else {
    visible.value = false;
  }
};

/** 确认提交后关闭抽屉 */
const quickClose = () => {
  visible.value = false;
};

/** 确认 */
const confirm = () => {
  emits('confirm');
};

// 关闭抽屉
const cancel = () => {
  emits('cancel');
};

// 当前组件获取父组件传递的事件方法，然后点击确认和提交是触发父组件传递过来的事件
const emits = defineEmits(['confirm', 'cancel']);

// defineExpose是vue3添加的一个api，放在<script setup>下使用的，
// 目的是把属性和方法暴露出去，可以用于父子组件通信，子组件把属性暴露出去，
// 父组件用ref获取子组件DOM，子组件暴露的方法或属性可以用dom获取。
defineExpose({
  open,
  close,
  quickClose
});
</script>

<template>
  <div>
    <ElDrawer
      v-model="visible"
      :title="title"
      :size="drawerSize"
      :direction="direction"
      :close-on-click-modal="closeOnClickModel"
      :destroy-on-close="destroyOnClose"
      :before-close="close"
      :loading="loading"
      :footer-hidden="footerHidden"
    >
      <div class="formDrawer">
        <div class="body">
          <slot name="content"></slot>
        </div>
        <div v-if="!footerHidden" class="footer">
          <ElButton v-throttle="confirm" type="primary" loading-icon="Eleme" :loading="confirmLoading">
            {{ confirmText || '确认' }}
          </ElButton>
          <ElButton type="danger" @click="cancel">{{ cancelText || '取消' }}</ElButton>
        </div>
      </div>
    </ElDrawer>
  </div>
</template>

<style lang="scss" scoped>
.formDrawer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .body {
    bottom: 50px;
    flex: 1;
    padding-right: 8px; // 为滚动条预留空间
    overflow-y: auto; // 超出部分则滚动
    @apply text-14px text-#303133 dark:text-#E5EAF3;
  }

  .footer {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: auto;
  }
}

:deep(.el-drawer__title) {
  @apply text-#303133 dark:text-#CFD3DC;
}

:deep(.el-drawer__body) {
  padding-top: 0;
}

:deep(.el-drawer__header) {
  margin-bottom: 18px;
}
</style>
