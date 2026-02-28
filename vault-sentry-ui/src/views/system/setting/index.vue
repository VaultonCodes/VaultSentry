<script setup lang="ts">
import { ref } from 'vue';
interface FormDataType {
  'sftp.preview-size': number;
  'sftp.upload-backup-file-name': string;
  'sftp.upload-present-backup': string;
}

const formData = ref<FormDataType>({
  'sftp.preview-size': 2,
  'sftp.upload-backup-file-name': 'valut_${titleName}_${timestamp}',
  'sftp.upload-present-backup': 'true'
});
</script>

<template>
  <div class="vault-flex">
    <VaultCard>
      <ElTabs tab-position="left">
        <ElTabPane label="SFTP" class="p-10px">
          <h3 class="m-b-5px">SFTP设置</h3>
          <ElForm :model="formData" label-width="120px">
            <ElFormItem label="重复文件备份">
              <ElSwitch
                v-model="formData['sftp.upload-present-backup']"
                inline-prompt
                active-value="true"
                active-text="备份"
                inactive-value="false"
                inactive-text="覆盖"
              />
              <span class="text-12px color-gray">文件上传时, 若文件存在是否备份原始文件</span>
            </ElFormItem>
            <ElFormItem label="备份文件名称">
              <ElInput v-model="formData['sftp.upload-backup-file-name']" class="w-300px" clearable />
              <span class="text-12px color-gray">${fileName} 文件名称, ${timestamp} 时间戳, ${time} 时间</span>
            </ElFormItem>
            <ElFormItem label="文件预览大小">
              <ElInput v-model="formData['sftp.preview-size']" class="w-300px" type="number" clearable>
                <template #suffix>
                  <span>MB</span>
                </template>
              </ElInput>
              <span class="text-12px color-gray">可以直接查看或编辑小于等于该大小的普通文件</span>
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary">保存</ElButton>
            </ElFormItem>
          </ElForm>
        </ElTabPane>
        <ElTabPane label="登录设置" />
        <ElTabPane label="加密设置" />
        <ElTabPane label="日志设置" />
        <ElTabPane label="自动清理" />
        <ElTabPane label="关于" />
      </ElTabs>
    </VaultCard>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
}
</style>
