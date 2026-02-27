<script setup lang="ts" name="uploadPage">
import { ref } from 'vue';

const avatar1 = ref('https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp');
const avatar2 = ref('https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp');
const avatar3 = ref('https://img0.baidu.com/it/u=2703866081,3694877873&fm=253&fmt=auto&app=138&f=JPEG');
const imageList = ref([
  { name: 'picture1', url: 'https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp' },
  { name: 'picture2', url: 'https://pic3.zhimg.com/v2-b6c350529f3c06c8a90d886c311f3866_b.webp' },
  { name: 'picture3', url: 'https://pic2.zhimg.com/v2-44ce1b82f7e68de4078bf513221619e1_b.webp' }
]);

/** 下载/导出 */
const handleDownload = () => {
  window.location.href = `${import.meta.env.VITE_SERVER}/excelTemplate`;
};

// Excel组件Ref
const excelRef = ref();

/** 下载模板 */
const handleTemplateExcel = () => {
  window.location.href = `${import.meta.env.VITE_SERVER}/excelTemplate`;
};

/** 导入 */
const handleImportExcel = () => {
  const params = {
    title: '导入数据',
    templeApi: `${import.meta.env.VITE_SERVER}/excelTemplate`,
    importApi: '/excelImport'
  };
  excelRef.value.excelParams(params);
};
</script>

<template>
  <div class="p-4px">
    <div class="w-500px flex flex-justify-between">
      <!-- 方形示例 -->
      <VaultUploadImage v-model:image-url="avatar1">
        <template #content>
          <ElIcon><Avatar /></ElIcon>
          <span>请上传头像</span>
        </template>
        <template #tip>方形示例</template>
      </VaultUploadImage>
      <!-- 圆形示例 -->
      <VaultUploadImage v-model:image-url="avatar2" border-radius="50%">
        <template #content>
          <ElIcon><Avatar /></ElIcon>
          <span>请上传头像</span>
        </template>
        <template #tip>圆形示例</template>
      </VaultUploadImage>
      <!-- 长方形示例 -->
      <VaultUploadImage v-model:image-url="avatar3" width="220px">
        <template #tip>长方形示例</template>
      </VaultUploadImage>
    </div>
    <div class="h-20px"></div>
    <!-- 多图片上传示例 -->
    <VaultUploadImages v-model:file-list="imageList" :drag="false">
      <template #content>
        <ElIcon><Picture /></ElIcon>
        <span>请上传照片</span>
      </template>
      <template #tip>多图片上传，图片最大为 3M[禁止拖拽上传]</template>
    </VaultUploadImages>
    <div class="h-20px"></div>
    <div class="w-200px flex flex-justify-between">
      <!-- 导出按钮 -->
      <ElButton type="primary" icon="Download" plain @click="handleDownload">导出</ElButton>
      <!-- 导入组件 -->
      <ElButton type="info" icon="Upload" plain @click="handleImportExcel">导入</ElButton>
      <VaultExcel ref="excelRef" @handle-template-excel="handleTemplateExcel"></VaultExcel>
    </div>
    <div class="h-20px"></div>
    <!-- 上传图库 -->
    <VaultImage>
      <template #content>
        <div class="flex flex-col flex-items-center text-[--el-color-primary]">
          <ElIcon :size="30"><Avatar /></ElIcon>
          <span class="m-t-4px text-12px">请上传头像</span>
        </div>
      </template>
      <template #tip>多图片上传，图片最大为 3M[禁止拖拽上传]</template>
    </VaultImage>
    <div class="h-20px"></div>
    <!-- 上传图库 -->
    <VaultImage>
      <template #tip>多图片上传，图片最大为 3M[禁止拖拽上传]</template>
    </VaultImage>
  </div>
</template>

<style scoped></style>
