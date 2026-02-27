<script setup lang="ts" name="dialogPage">
import { reactive, ref } from 'vue';
import { MsgError, MsgSuccess, NoticeSuccess } from '@/utils/message.ts';

/** 打开Dialog */
const handleDialog = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = '二次封装Dialog模版';
  dialogRef.value.open();
  NoticeSuccess('Dialog模版');
};

// 添加 OR 修改对话框Ref
const dialogRef = ref();
/** 打开Dialog操作 */
const title = ref('二次封装Dialog模版');
// form表单Ref
const formRef = ref<any>();
// form表单
const form = ref<any>({
  roleId: '',
  roleName: '',
  roleCode: ''
});

/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    roleId: '',
    roleName: '',
    roleCode: ''
  };
};

/** 表单规则 */
const rules = reactive({
  roleName: [{ required: true, message: '请输入角色名字', trigger: 'change' }],
  roleCode: [{ required: true, message: '请输入角色编号', trigger: 'change' }]
});

// 确定按钮是否显示Loading
const confirmLoading = ref(false);

/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      MsgSuccess('验证成功');
      confirmLoading.value = false;
    } else {
      MsgError('验证失败，请检查填写内容');
      confirmLoading.value = false;
    }

    // console.log("表单ID", form.value.roleId);
    // if (form.value.roleId != null && form.value.roleId != "") {
    //   try {
    //     await update(form.value);
    //     NoticeSuccess("修改成功");
    //     confirmLoading.value = false;
    //     DialogRef.value.quickClose();
    //     resetForm();
    //     handleListPage();
    //   } catch (error) {
    //     console.log(error);
    //     confirmLoading.value = false;
    //     NoticeError("修改失败，请刷新重试");
    //   }
    // } else {
    //   try {
    //     await add(form.value);
    //     NoticeSuccess("添加成功");
    //     confirmLoading.value = false;
    //     DialogRef.value.quickClose();
    //     resetForm();
    //     handleListPage();
    //   } catch (error) {
    //     console.log(error);
    //     confirmLoading.value = false;
    //     NoticeError("添加失败，请刷新重试");
    //   }
    // }

    /** 静态页面 */
    // let loadingTime = 1;
    // setInterval(() => {
    //   loadingTime--;
    //   if (loadingTime === 0) {
    //     NoticeSuccess("朕让你提交了么？信不信锤你");
    //     confirmLoading.value = false;
    //     resetForm();
    //     DialogRef.value.quickClose();
    //   }
    // }, 1000);
  });
};

/** 取消 */
const handleCancel = () => {
  dialogRef.value.close();
};
</script>

<template>
  <div class="p-6px">
    <ElButton type="primary" plain @click="handleDialog">打开Dialog</ElButton>

    <VaultDialog
      ref="dialogRef"
      :title="title"
      :loading="confirmLoading"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #content>
        <ElForm ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
          <ElRow :gutter="10">
            <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
              <ElFormItem label="角色名称" prop="roleName">
                <ElInput v-model="form.roleName" placeholder="请输入角色名称" clearable />
              </ElFormItem>
            </ElCol>
            <ElCol :sm="{ span: 12 }" :xs="{ span: 24 }">
              <ElFormItem label="角色编号" prop="roleCode">
                <ElInput v-model="form.roleCode" placeholder="请输入角色编号" clearable />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
        {{ form }}
      </template>
    </VaultDialog>
  </div>
</template>

<style scoped></style>
