<script setup lang="ts" name="drawerPage">
import { reactive, ref } from 'vue';
import { MsgError, MsgSuccess, NoticeSuccess } from '@/utils/message.ts';

/** 打开Drawer */
const handleDrawer = () => {
  // 重置表单
  resetForm();
  // 标题
  title.value = '二次封装Dialog模版';
  drawerRef.value.open();
  NoticeSuccess('Dialog模版');
};

// 添加 OR 修改对话框Ref
const drawerRef = ref();
/** 打开Drawer操作 */
const title = ref('二次封装Drawer模版');
// form表单Ref
const formRef = ref<any>();
// form表单
const form = ref<any>({
  noticeTitle: '',
  noticeStatus: '',
  noticeContent: ''
});

/** 清空表单数据 */
const resetForm = () => {
  form.value = {
    noticeTitle: '',
    noticeStatus: '',
    noticeContent: ''
  };
};

/** 表单规则 */
const rules = reactive({
  noticeTitle: [{ required: true, message: '请输入公告名字', trigger: 'change' }],
  noticeStatus: [{ required: true, message: '请输入选择公告状态', trigger: 'change' }]
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
  });

  // console.log("表单ID", form.value.noticeId);
  // if (form.value.noticeId != null && form.value.noticeId != "") {
  //   try {
  //     await update(form.value);
  //     NoticeSuccess("修改成功");
  //     confirmLoading.value = false;
  //     drawerRef.value.quickClose();
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
  //     drawerRef.value.quickClose();
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
  //     drawerRef.value.quickClose();
  //   }
  // }, 1000);
};

/** 取消 */
const handleCancel = () => {
  drawerRef.value.close();
};
</script>

<template>
  <div class="p-4px">
    <ElButton type="primary" plain @click="handleDrawer">打开Drawer</ElButton>
    <VaultDrawer
      ref="drawerRef"
      :title="title"
      :loading="confirmLoading"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #content>
        <ElForm ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
          <ElRow>
            <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
              <ElFormItem label="公告名称" prop="noticeTitle">
                <ElInput v-model="form.noticeTitle" placeholder="请输入公告名称" clearable />
              </ElFormItem>
            </ElCol>
            <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
              <ElFormItem label="公告状态" prop="noticeStatus">
                <ElSelect v-model="form.noticeStatus" placeholder="请选择公告状态" clearable>
                  <ElOption label="启用" value="1" />
                  <ElOption label="停用" value="0" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
              <ElFormItem label="公告内容" prop="noticeContent">
                <ElInput v-model="form.noticeContent" placeholder="请输入公告内容" clearable />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
        {{ form }}
      </template>
    </VaultDrawer>
  </div>
</template>

<style scoped></style>
