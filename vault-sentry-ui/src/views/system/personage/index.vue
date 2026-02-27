<script setup lang="ts" name="personagePage">
import { nextTick, reactive, ref } from 'vue';
import { MsgError, MsgSuccess } from '@/utils/message.ts';

// 个人信息
const mine = ref({
  avatar: 'https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp',
  loginName: 'YU-ADMIN',
  userName: '于金金',
  phone: '18593114301',
  email: 'yuxintao6@163.com',
  deptName: '研发部门',
  roleName: '超级管理员',
  createTime: '2023-11-23 18:00:00'
});

// el-card标签选择name
const activeName = ref('first');

/** 基本资料 Begin  */

// form表单Ref
const mineFormRef = ref<any>();
// form表单
const mineForm = ref<any>({
  loginName: '',
  phone: '',
  email: '',
  sex: '0'
});
/** 清空表单数据 */
const resetMineForm = () => {
  // 等待 DOM 更新完成
  nextTick(() => {
    if (mineFormRef.value) {
      // 重置该表单项，将其值重置为初始值，并移除校验结果
      mineFormRef.value.resetFields();
    }
  });
  mineForm.value = {
    loginName: '',
    phone: '',
    email: '',
    sex: '0'
  };
};
/** 表单规则 */
const mineRules = reactive({
  loginName: [{ required: true, message: '请输入登录名称', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
});

/** 保存 */
const handleMineSave = () => {
  if (!mineFormRef.value) return;
  (mineFormRef.value as any).validate(async (valid: any) => {
    if (valid) {
      MsgSuccess('保存成功');
    } else {
      MsgError('验证失败，请检查填写内容');
    }
  });
};

/** 基本资料 End  */

/** 修改密码 Begin  */
// form表单Ref
const pwdFormRef = ref<any>();
// form表单
const pwdForm = ref<any>({
  password: '',
  newPassword: '',
  confirmPassword: ''
});

/** 清空表单数据 */
const resetPwdForm = () => {
  // 等待 DOM 更新完成
  nextTick(() => {
    if (pwdFormRef.value) {
      // 重置该表单项，将其值重置为初始值，并移除校验结果
      pwdFormRef.value.resetFields();
    }
  });
  pwdForm.value = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  };
};

/** 表单规则 */
const pwdRules = reactive({
  password: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'change' }],
  confirmPassword: [{ required: true, message: '请输入确认密码', trigger: 'change' }]
});

/** 保存 */
const handlePwdSave = () => {
  if (!pwdFormRef.value) return;
  (pwdFormRef.value as any).validate(async (valid: any) => {
    if (valid) {
      MsgSuccess('保存成功');
    } else {
      MsgError('验证失败，请检查填写内容');
    }
  });
};

/** 修改密码 End  */
</script>

<template>
  <div class="p-6px">
    <ElRow :gutter="20">
      <ElCol :span="6" :xs="24">
        <ElCard class="rounded-md" shadow="never">
          <div class="text-13px text-#303133 dark:text-#E5EAF3">
            <div class="flex flex-justify-center">
              <VaultUploadImage v-model:image-url="mine.avatar">
                <template #content>
                  <ElIcon><Avatar /></ElIcon>
                  <span>请上传头像</span>
                </template>
              </VaultUploadImage>
            </div>
            <div class="mt-20px flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex flex-items-center">
                <ElIcon size="15"><UserFilled /></ElIcon>
                <div class="p-l-2px">登录名称</div>
              </div>
              <div v-text="mine.loginName"></div>
            </div>
            <div class="flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex flex-items-center">
                <ElIcon size="15"><User /></ElIcon>
                <div class="p-l-2px">用户名称</div>
              </div>
              <div v-text="mine.userName"></div>
            </div>
            <div class="flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex flex-items-center">
                <ElIcon size="15"><Iphone /></ElIcon>
                <div class="p-l-2px">手机号码</div>
              </div>
              <div v-text="mine.phone"></div>
            </div>
            <div class="flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex flex-items-center">
                <ElIcon size="15"><Message /></ElIcon>
                <div class="p-l-2px">用户邮箱</div>
              </div>
              <div v-text="mine.email"></div>
            </div>
            <div class="flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex flex-items-center">
                <ElIcon size="15"><Postcard /></ElIcon>
                <div class="p-l-2px">所属部门</div>
              </div>
              <div v-text="mine.deptName"></div>
            </div>
            <div class="flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex flex-items-center">
                <ElIcon size="15"><Collection /></ElIcon>
                <div class="p-l-2px">所属角色</div>
              </div>
              <div v-text="mine.roleName"></div>
            </div>
            <div class="flex flex-wrap flex-justify-between p-y-12px">
              <div class="flex items-center">
                <ElIcon size="15"><Calendar /></ElIcon>
                <div class="p-l-2px">创建日期</div>
              </div>
              <div v-text="mine.createTime"></div>
            </div>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="18" :xs="24">
        <ElCard class="rounded-md" shadow="never" :body-style="{ 'padding-top': '6px' }">
          <ElTabs v-model="activeName">
            <ElTabPane label="基本资料" name="first">
              <ElForm ref="mineFormRef" :rules="mineRules" :model="mineForm" label-width="80px" status-icon>
                <ElRow>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="登录名称" prop="loginName">
                      <el-input v-model="mineForm.loginName" placeholder="请输入登录名称" clearable />
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="手机号码" prop="phone">
                      <el-input v-model="mineForm.phone" placeholder="请输入手机号码" clearable />
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="邮箱" prop="email">
                      <el-input v-model="mineForm.email" placeholder="请输入邮箱" clearable />
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="性别" prop="sex">
                      <el-radio-group v-model="mineForm.sex" placeholder="请选择性别">
                        <el-radio value="1" border>男</el-radio>
                        <el-radio value="2" border>女</el-radio>
                        <el-radio value="0" border>未知</el-radio>
                      </el-radio-group>
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }" class="mt-6px">
                    <ElFormItem>
                      <el-button type="primary" plain @click="handleMineSave">保存</el-button>
                      <el-button type="danger" plain @click="resetMineForm">重置</el-button>
                    </ElFormItem>
                  </ElCol>
                </ElRow>
              </ElForm>
              {{ mineForm }}
            </ElTabPane>
            <ElTabPane label="修改密码" name="second">
              <ElForm ref="pwdFormRef" :rules="pwdRules" :model="pwdForm" label-width="80px" status-icon>
                <ElRow>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="密码" prop="password">
                      <el-input v-model="pwdForm.password" placeholder="请输入旧密码" show-password clearable />
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="新密码" prop="newPassword">
                      <el-input v-model="pwdForm.newPassword" placeholder="请输入新密码" show-password clearable />
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <ElFormItem label="确认密码" prop="confirmPassword">
                      <el-input v-model="pwdForm.confirmPassword" placeholder="请输入确认密码" show-password clearable />
                    </ElFormItem>
                  </ElCol>
                  <ElCol :sm="{ span: 24 }" :xs="{ span: 24 }" class="mt-6px">
                    <ElFormItem>
                      <el-button type="primary" plain @click="handlePwdSave">保存</el-button>
                      <el-button type="danger" plain @click="resetPwdForm">重置</el-button>
                    </ElFormItem>
                  </ElCol>
                </ElRow>
              </ElForm>
              {{ pwdForm }}
            </ElTabPane>
          </ElTabs>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped></style>
