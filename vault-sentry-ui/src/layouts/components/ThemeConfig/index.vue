<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useTheme } from '@/utils/theme.ts';
import mittBus from '@/utils/mittBus.ts';
import { MsgSuccess } from '@/utils/message.ts';
import useGlobalStore from '@/stores/modules/global.ts';

const globalStore = useGlobalStore();

const { changeThemeColor, changeGreyOrWeak, setAsideTheme, setHeaderTheme } = useTheme();
const {
  layout,
  isCollapse,
  transition,
  tabsStyle,
  uniqueOpened,
  menuWidth,
  isGrey,
  isWeak,
  asideInverted,
  headerInverted
} = storeToRefs(globalStore);

// 组件尺寸相关
const dimension = computed(() => globalStore.dimension);
const dimensionList = ref<any>([]);

onMounted(() => {
  handleSwitchLanguage();
});

/** 切换语言 */
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
    handleSwitchLanguage();
  }
);

const handleDimension = (item: string) => {
  if (dimension.value === item) return;
  globalStore.setDimension(item);
  MsgSuccess('操作成功');
};

// 主题颜色配置
const themeColors = [
  '#2992FF',
  '#1E71EE',
  '#6169FF',
  '#8076C3',
  '#1BA784',
  '#316C72',
  '#FF6B35',
  '#0099FF',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4'
];

// 布局选项配置
const layoutOptions = [
  { value: 'vertical', label: '纵向', class: 'layout-vertical', hasContainer: true, hasLight: false },
  { value: 'columns', label: '分栏', class: 'layout-columns', hasContainer: false, hasLight: false },
  { value: 'classic', label: '经典', class: 'layout-classic', hasContainer: true, hasLight: false },
  { value: 'optimum', label: '混合', class: 'layout-optimum', hasContainer: true, hasLight: false },
  { value: 'horizontal', label: '横向', class: 'layout-horizontal', hasContainer: false, hasLight: false }
];

const DrawerRef = ref();

/** 打开主题配置 */
const handleThemeConfig = () => {
  // 使用递归重试机制，确保组件完全加载
  const tryOpenDrawer = (retryCount = 0) => {
    if (DrawerRef.value?.open) {
      DrawerRef.value.open();
    } else if (retryCount < 3) {
      // 最多重试3次，每次延迟100ms
      setTimeout(() => tryOpenDrawer(retryCount + 1), 100);
    } else {
      console.warn('无法打开主题配置抽屉，组件可能未正确加载');
    }
  };

  nextTick(() => {
    tryOpenDrawer();
  });
};

/** 布局切换 */
const setLayout = (value: any) => {
  globalStore.setGlobalState('layout', value);
  setAsideTheme();
};

/** 打开主题配置对话框，on 接收事件 */
mittBus.on('handleThemeConfig', () => {
  handleThemeConfig();
});
</script>

<template>
  <!-- 主题配置 -->
  <VaultDrawer ref="DrawerRef" title="主题配置" size="320" :footer-hidden="true" :close-on-click-model="true">
    <template #content>
      <div class="select-none p-t-8px">
        <!-- 主题颜色选择器 -->
        <div class="config-section">
          <div class="section-header">
            <ElIcon :size="18" class="section-icon"><Connection /></ElIcon>
            <span class="section-title">主题颜色</span>
          </div>

          <div class="theme-colors-grid">
            <div
              v-for="color in themeColors"
              :key="color"
              class="theme-color-item"
              :class="{ active: globalStore.themeColor === color }"
              @click="changeThemeColor(color)"
            >
              <div class="color-preview" :style="{ backgroundColor: color }">
                <div v-if="globalStore.themeColor === color" class="color-check">
                  <ElIcon><Check /></ElIcon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 布局样式选择器 -->
        <div class="config-section">
          <div class="section-header">
            <ElIcon :size="18" class="section-icon"><Notification /></ElIcon>
            <span class="section-title">布局样式</span>
          </div>

          <div class="layout-grid">
            <div
              v-for="layoutOption in layoutOptions"
              :key="layoutOption.value"
              class="layout-item"
              :class="[layoutOption.class, { 'is-active': layout === layoutOption.value }]"
              @click="setLayout(layoutOption.value)"
            >
              <div class="layout-preview">
                <div class="layout-dark"></div>
                <div v-if="layoutOption.hasContainer" class="layout-container">
                  <div class="layout-light"></div>
                  <div class="layout-content"></div>
                </div>
                <div v-if="!layoutOption.hasContainer && layoutOption.hasLight" class="layout-light"></div>
                <div
                  v-if="!layoutOption.hasContainer && !layoutOption.hasLight && layoutOption.value !== 'columns'"
                  class="layout-content"
                ></div>
                <!-- 分栏布局特殊处理 -->
                <template v-if="layoutOption.value === 'columns'">
                  <div class="layout-light"></div>
                  <div class="layout-content"></div>
                </template>
              </div>
              <div class="layout-label">{{ layoutOption.label }}</div>
              <div v-if="layout === layoutOption.value" class="layout-check">
                <ElIcon><Check /></ElIcon>
              </div>
            </div>
          </div>
        </div>

        <!-- 界面配置 -->
        <div class="config-section">
          <div class="section-header">
            <ElIcon :size="18" class="section-icon"><ChatLineRound /></ElIcon>
            <span class="section-title">界面配置</span>
          </div>

          <div class="interface-config">
            <div class="config-item">
              <div class="config-label">
                <span>路由动画</span>
              </div>
              <ElSelect v-model="transition" placeholder="请选择路由动画" clearable class="config-input">
                <ElOption label="默认" value="fade-default" />
                <ElOption label="淡入淡出" value="fade" />
                <ElOption label="滑动" value="fade-slide" />
                <ElOption label="渐变" value="zoom-fade" />
                <ElOption label="底部滑出" value="fade-bottom" />
                <ElOption label="缩放消退" value="fade-scale" />
              </ElSelect>
            </div>

            <div class="config-item">
              <div class="config-label">菜单宽度</div>
              <ElInputNumber v-model="menuWidth" class="config-input" :min="200" :max="260" :step="2" />
            </div>

            <div class="config-item">
              <div class="config-label">标签页风格</div>
              <ElSelect v-model="tabsStyle" placeholder="请选择标签页风格" clearable class="config-input">
                <ElOption label="谷歌风格" value="google" />
                <ElOption label="卡片风格" value="card" />
              </ElSelect>
            </div>

            <div class="config-item">
              <div class="config-label">组件尺寸</div>
              <ElSelect
                v-model="dimension"
                placeholder="请选择组件尺寸"
                clearable
                class="config-input"
                @change="handleDimension"
              >
                <ElOption v-for="item in dimensionList" :key="item.value" :label="item.label" :value="item.value" />
              </ElSelect>
            </div>

            <div class="config-item">
              <div class="config-label">
                <span>菜单手风琴</span>
                <ElTooltip content="菜单展开[启用-单个/关闭-多个]">
                  <ElIcon class="warning-icon"><Warning /></ElIcon>
                </ElTooltip>
              </div>
              <ElSwitch
                v-model="uniqueOpened"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
              />
            </div>

            <div class="config-item">
              <div class="config-label">侧边栏反转色</div>
              <ElSwitch
                v-model="asideInverted"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                @change="setAsideTheme"
              />
            </div>

            <div class="config-item">
              <div class="config-label">头部反转色</div>
              <ElSwitch
                v-model="headerInverted"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                @change="setHeaderTheme"
              />
            </div>

            <div class="config-item">
              <div class="config-label">灰色模式</div>
              <ElSwitch
                v-model="isGrey"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                @change="changeGreyOrWeak('grey', !!$event)"
              />
            </div>

            <div class="config-item">
              <div class="config-label">色弱模式</div>
              <ElSwitch
                v-model="isWeak"
                active-text="启用"
                inactive-text="停用"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
                @change="changeGreyOrWeak('weak', !!$event)"
              />
            </div>

            <div class="config-item">
              <div class="config-label">折叠菜单</div>
              <ElSwitch
                v-model="isCollapse"
                active-text="展开"
                inactive-text="折叠"
                :active-value="true"
                :inactive-value="false"
                :inline-prompt="true"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </VaultDrawer>
</template>

<style lang="scss" scoped>
.config-section {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;

  .section-icon {
    margin-right: 12px;
    font-size: 18px;
    color: var(--el-color-primary);
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  .section-title {
    position: relative;
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    letter-spacing: 0.3px;

    &::after {
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      content: '';
      background: linear-gradient(
        135deg,
        var(--el-color-primary) 0%,
        var(--el-color-primary-light-3) 50%,
        transparent 100%
      );
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(var(--el-color-primary-rgb), 0.3);
      animation: title-underline 3s ease-in-out infinite;
    }

    &::before {
      position: absolute;
      top: -2px;
      left: -4px;
      width: 6px;
      height: 6px;
      content: '';
      background: var(--el-color-primary);
      border-radius: 50%;
      opacity: 0.6;
      animation: title-dot 2s ease-in-out infinite;
    }
  }

  &:hover {
    .section-icon {
      opacity: 1;
      transform: scale(1.1);
    }

    .section-title::after {
      width: 50px;
      animation: title-underline-hover 0.6s ease forwards;
    }
  }
}

/** 主题颜色选择器 */
.theme-colors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  .theme-color-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 6px;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--el-bg-color);

    &:hover {
      background-color: var(--el-fill-color-light);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);

      .color-preview {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: color-preview-hover 0.6s ease-in-out infinite;

        &::before {
          opacity: 1;
          animation: shimmer-sweep 1.5s ease-in-out infinite;
        }
      }
    }

    &.active {
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary);
      box-shadow: 0 2px 8px rgba(var(--el-color-primary-rgb), 0.15);

      .color-preview {
        transform: scale(1.02);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: color-pulse 2s ease-in-out infinite;
      }
    }

    .color-preview {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        opacity: 0;
        transform: translateX(-100%);
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }
    }

    .color-check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      color: var(--el-color-primary);
      font-size: 10px;
      font-weight: bold;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(4px);
      animation: fade-in-scale 0.3s ease;

      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
        border-radius: 50%;
        z-index: -1;
      }
    }
  }
}

/** 布局配置 */
.layout-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .layout-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 12px;
    background: var(--el-bg-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background-color: var(--el-fill-color-light);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    &.is-active {
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary);
      box-shadow: 0 4px 20px rgba(var(--el-color-primary-rgb), 0.3);
    }

    .layout-preview {
      width: 80px;
      height: 60px;
      margin-bottom: 8px;
      padding: 6px;
      border-radius: 8px;
      background: var(--el-fill-color-lighter);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

      .layout-dark {
        background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-light-3));
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .layout-light {
        background: linear-gradient(135deg, var(--el-color-primary-light-5), var(--el-color-primary-light-7));
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .layout-content {
        background: linear-gradient(135deg, var(--el-color-primary-light-8), var(--el-color-primary-light-9));
        border: 1px dashed var(--el-color-primary-light-5);
        border-radius: 4px;
      }
    }

    .layout-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--el-text-color-primary);
      text-align: center;
    }

    .layout-check {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 18px;
      height: 18px;
      background: var(--el-color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 11px;
      animation: fadeInScale 0.3s ease;
    }
  }

  // 布局样式
  .layout-vertical .layout-preview {
    display: flex;
    justify-content: space-between;

    .layout-dark {
      width: 20%;
    }

    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 73%;

      .layout-light {
        height: 20%;
      }

      .layout-content {
        height: 69%;
      }
    }
  }

  .layout-columns .layout-preview {
    display: flex;
    justify-content: space-between;

    .layout-dark {
      width: 14%;
    }

    .layout-light {
      width: 17%;
    }

    .layout-content {
      width: 55%;
    }
  }

  .layout-classic .layout-preview {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .layout-dark {
      height: 22%;
    }

    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;

      .layout-light {
        width: 20%;
      }

      .layout-content {
        width: 70%;
      }
    }
  }

  .layout-optimum .layout-preview {
    display: flex;
    justify-content: space-between;

    .layout-dark {
      width: 20%;
    }

    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 73%;

      .layout-light {
        height: 16%;
      }

      .layout-content {
        height: 72%;
      }
    }
  }

  .layout-horizontal .layout-preview {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .layout-dark {
      height: 20%;
    }

    .layout-content {
      height: 67%;
    }
  }
}

/** 界面配置 */
.interface-config {
  .config-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--el-border-color-extra-light);

    &:last-child {
      border-bottom: none;
    }

    .config-label {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      margin-right: 16px;
      font-size: 14px;
      color: var(--el-text-color-primary);
      font-weight: 500;
      line-height: 1.4;

      .warning-icon {
        margin-left: 2px;
        color: var(--el-text-color-secondary);
        cursor: help;
        transition: color 0.2s ease;
        flex-shrink: 0;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .config-input {
      width: 180px;
      flex-shrink: 1;
    }
  }
}

/** 动画 */
@keyframes fade-in-scale {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes title-underline {
  0%,
  100% {
    transform: scaleX(1);
    opacity: 0.8;
  }
  50% {
    transform: scaleX(1.1);
    opacity: 1;
  }
}

@keyframes title-underline-hover {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.2);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes title-dot {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.9;
  }
}

@keyframes color-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes color-preview-hover {
  0%,
  100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes shimmer-sweep {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/** 响应式设计 */
// @media (max-width: 768px) {
//   .theme-colors-grid {
//     grid-template-columns: repeat(3, 1fr);
//     gap: 12px;
//   }

//   .layout-grid {
//     grid-template-columns: 1fr;
//     gap: 16px;
//   }

//   .interface-config .config-item {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 12px;

//     .config-input {
//       width: 100%;
//     }
//   }
// }
</style>
