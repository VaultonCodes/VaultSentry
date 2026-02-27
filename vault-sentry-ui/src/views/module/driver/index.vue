<script setup lang="ts" name="driverPage">
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

// 根据div的ID进行配置
const driverObj = driver({
  allowClose: true,
  doneBtnText: '结束',
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  steps: [
    {
      element: '#one',
      popover: {
        title: '第一步',
        description: '第一步引导',
        side: 'right'
      }
    },
    {
      element: '#two',
      popover: {
        title: '第二步',
        description: '第二步引导',
        side: 'right'
      }
    },
    {
      element: '#three',
      popover: {
        title: '第三步',
        description: '第三步引导',
        side: 'left'
      }
    }
  ]
});
</script>

<template>
  <div class="p-4px">
    <ElAlert
      title="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js, pnpm install driver.js"
      type="warning"
      :closable="false"
    />
    <div id="one">
      <ElButton type="primary">第一步</ElButton>
    </div>
    <div class="h-20px"></div>
    <div id="two">
      <ElButton type="warning">第二步</ElButton>
    </div>
    <div class="h-20px"></div>
    <div id="three">
      <ElButton type="danger">第三步</ElButton>
    </div>
    <div class="h-20px"></div>
    <div>
      <ElButton type="primary" @click.prevent.stop="driverObj.drive()">打开引导页</ElButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
