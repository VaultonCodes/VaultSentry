<script setup lang="ts" name="svgIconPage">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { MsgError, MsgSuccess, MsgWarning } from '@/utils/message';

/** 第二种字典获取数据开始[每次进入页面一次获取所需要的数据源] */
// import { useDict } from "@/hooks/dicts/index.ts";
// const { dicts } = useDict(["sys_notice_type", "sys_user_sex"]);
// const tagValue = ref("1");
// const noticeType = ref();
/** 第二种字典获取数据结束 */

/** 复制指令开始 */

const { copy, isSupported } = useClipboard();

const copyData = ref<string>('主人，妲己永远陪在你身边👻');

const handleCopy = () => {
  if (!isSupported) {
    MsgError('您的浏览器不支持Clipboard API');
    return;
  }
  if (!copyData.value) {
    MsgWarning('请输入要复制的内容');
    return;
  }
  copy(copyData.value);
  MsgSuccess(`复制成功：${copyData.value}`);
};

/** 复制指令结束 */

/** 图标选择器开始 */

const iconValue = ref();

const handleResetIcon = () => {
  iconValue.value = 'Sunny';
};

const handleEchoIcon = () => {
  MsgSuccess(iconValue);
};

/** 图标选择器结束 */
</script>

<template>
  <div class="p-4px">
    <VaultSvgIcon name="vault-mobile-menu" width="50px" height="50px"></VaultSvgIcon>
    <div class="h-20px"></div>
    <ElInput v-model="copyData" placeholder="请输入内容" style="width: 300px">
      <template #append>
        <ElButton @click="handleCopy">复制</ElButton>
      </template>
    </ElInput>
    <div class="h-20px"></div>
    <div class="h-20px"></div>
    <VaultSelectIcon v-model="iconValue" width="300"></VaultSelectIcon>
    <div class="h-20px"></div>
    <div class="h-20px"></div>
    <ElButton type="primary" plain @click="handleEchoIcon">回显图标</ElButton>
    <ElButton type="danger" plain @click="handleResetIcon">重置图标</ElButton>
    <!--
 <div class="h-20px"></div>
    <div class="h-20px"></div>
    <VaultTag :tagOptions="dicts.sys_notice_type" :value="tagValue"></VaultTag>
    <div class="h-20px"></div>
    <el-select placeholder="请选择公告类型" v-model="noticeType" style="width: 220px" clearable>
      <el-option v-for="item in dicts.sys_notice_type" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
    </el-select> 
-->
  </div>
</template>

<style scoped></style>
