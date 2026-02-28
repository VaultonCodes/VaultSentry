<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { HOME_URL, LOGIN_URL } from '@/config/index.ts';
import { MsgError, MsgWarning } from '@/utils/message.ts';
import { login } from "@/api";
import logo from '@/assets/images/logo/logo.webp';
import bg from '@/assets/images/login/bg.png';
import useUserStore from '@/stores/modules/user.ts';
import useKeepAliveStore from '@/stores/modules/keepAlive.ts';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter.ts';
import useTabsStore from '@/stores/modules/tabs.ts';
import VaultDark from '@/layouts/components/Header/components/Dark.vue';
import VaultThemeColor from './components/VaultThemeColor.vue';

const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
const router = useRouter();
const loginFormRef = ref<FormInstance>();
const loading = ref(false);

interface ILoginUser {
  loginName: string;
  password: string | number;
}

const loginForm = reactive<ILoginUser>({
  loginName: 'yuadmin',
  password: 'yuadmin123'
});

const loginRules: any = reactive<FormRules<ILoginUser>>({
  loginName: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          callback(new Error('账号只能包含数字和字母'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (!/^(?=.*\d)(?=.*[a-zA-Z]).+$/.test(value)) {
          callback(new Error('密码必须包含数字和字母'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});

/** 登录 */
const handleLogin = () => {
  if (!loginFormRef.value) return;
  (loginFormRef.value as any).validate(async (valid: any, fields: any) => {
    const loginName = loginForm.loginName;
    const password = loginForm.password;
    if (valid) {
      try {
        loading.value = true;
        // 1、执行登录接口
        const res: any = await login({ loginName, password, securityCode: '1234' });
        userStore.setToken(res.data.tokenValue);

        // 2、添加动态路由 AND 用户按钮 AND 角色信息 AND 用户个人信息
        if (userStore?.token) {
          await initDynamicRouter(); // 等待 initDynamicRouter 完成
        } else {
          MsgWarning('请重新登录');
          router.replace(LOGIN_URL);
          return;
        }

        // 3、清空 tabs数据、keepAlive缓存数据
        if (userStore.loginName) {
          if (userStore.loginName !== loginName) {
            tabsStore.$reset();
            userStore.setLoginName(loginName);
          }
        } else {
          tabsStore.$reset();
          userStore.setLoginName(loginName);
        }

        keepAliveStore.$reset();

        // 4、等待所有响应式更新和路由注册完成
        await nextTick();

        // 5、跳转到首页（所有操作完成后）
        await router.replace(HOME_URL);
      } catch (error) {
        // 等待1秒关闭loading
        let loadingTime = 1;
        setInterval(() => {
          loadingTime--;
          if (loadingTime === 0) {
            loading.value = false;
          }
        }, 1000);
      } finally {
        loading.value = false;
      }
    } else {
      console.log('登录校验失败', fields);
      new MsgError('验证失败，请检查表单内容');
    }
  });
};
</script>

<template>
  <div class="h-screen w-screen">
    <ElRow class="h-100%">
      <!-- 登录工具栏 -->
      <div
        class="transition-300ms pos-absolute right-8px top-8px z-10 h-40px flex flex-items-center border-1px border-#E4E7ED rounded-20px border-solid bg-#F4F4F5 p-x-12px p-y-2px shadow-[0_4px_12px_rgb(0_0_0_/_15%)] transition-all transition-ease dark:border-#4C4D4F dark:bg-#141414 dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
      >
        <VaultThemeColor></VaultThemeColor>
        <VaultDark></VaultDark>
      </div>

      <ElCol :lg="16" :md="12" :sm="15" :xs="0" class="flex flex-justify-center flex-items-center">
        <div class="login-background h-100% w-100%">
          <!-- 第二层：毛玻璃覆盖层 -->
          <div class="glass-overlay"></div>

          <!-- 第三层：内容层[在毛玻璃层之上] -->
          <div class="content-layer pos-absolute select-none text-center transition-500 transition-all transition-ease">
            <ElImage
              class="animate-float-picture m-b-50px h-336px max-w-500px w-360px <md:hidden <lg:h-320px <lg:max-w-400px"
              :src="bg"
            />
            <div class="m-b-8px text-center text-2xl text-[--el-text-color-primary] font-400 <md:hidden <lg:text-xl">
              欢迎登录
            </div>
            <div class="text-center text-16px text-[--el-text-color-primary] font-400 <md:hidden">
              或许我们只是差点运气
            </div>
          </div>
        </div>
      </ElCol>
      <ElCol
        :lg="8"
        :md="12"
        :sm="9"
        :xs="24"
        class="flex flex-col flex-justify-center flex-items-center bg-gray-50 dark:bg-#0C0C0C"
      >
        <div class="flex flex-items-center">
          <ElImage class="h-36px w-36px rounded-full" :src="logo" />
          <div class="m-l-6px text-xl font-500">VaultSentry</div>
        </div>
        <div class="m-y-18px flex flex-items-center text-gray-400 space-x-12px">
          <span class="inline-block h-1px w-64px bg-gray-300"></span>
          <span class="text-center">账号密码登录</span>
          <span class="inline-block h-1px w-64px bg-gray-300"></span>
        </div>
        <!-- 输入框盒子 -->
        <ElForm ref="loginFormRef" :model="loginForm" :rules="loginRules" class="w-260px">
          <ElFormItem prop="loginName">
            <ElInput v-model="loginForm.loginName" type="text" placeholder="请输入用户名" :suffix-icon="User" />
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              :suffix-icon="Lock"
            />
          </ElFormItem>
          <!-- 登录按钮 -->
          <ElFormItem>
            <ElButton
              v-if="!loading"
              v-throttle:3000="handleLogin"
              type="primary"
              class="w-100% bg-[--el-color-primary]"
              round
            >
              登录
            </ElButton>
            <ElButton v-else type="primary" class="w-100%" round :loading="loading">登录中</ElButton>
          </ElFormItem>
        </ElForm>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
/** 备案号 */
.bei-an-hao {
  position: absolute !important;
  bottom: 0 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  z-index: 10 !important;
  white-space: nowrap;
  padding-bottom: 10px;
  width: 100%;
}

.bei-an-hao a {
  font-size: 12px;
}

.login-background {
  position: relative;
  overflow: hidden;
  /* 使用少量渐变图形创建简洁的背景效果 */
  background:
    /* 大型椭圆渐变 - 右上角 */
    radial-gradient(ellipse 600px 450px at 85% 20%, rgba(var(--el-color-primary-rgb), 0.1), transparent 70%),
    /* 圆形渐变 - 左下角 */
    radial-gradient(500px circle at 25% 80%, rgba(var(--el-color-primary-rgb), 0.09), transparent 65%),
    /* 中型圆形渐变 - 中心 */
    radial-gradient(350px circle at 50% 50%, rgba(var(--el-color-primary-rgb), 0.08), transparent 60%),
    var(--el-bg-color-page, #f8f8f8);
}

html.dark .login-background {
  background:
    /* 大型椭圆渐变 - 右上角 */
    radial-gradient(ellipse 600px 450px at 85% 20%, rgba(255, 255, 255, 0.35), transparent 70%),
    /* 圆形渐变 - 左下角 */ radial-gradient(500px circle at 25% 80%, rgba(255, 255, 255, 0.32), transparent 65%),
    /* 中型圆形渐变 - 中心 */ radial-gradient(350px circle at 50% 50%, rgba(255, 255, 255, 0.3), transparent 60%),
    #03020c;
}

/* 第二层：毛玻璃覆盖层[覆盖在图形上方] */
.glass-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(36px);
  -webkit-backdrop-filter: blur(36px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
  pointer-events: none;
}

html.dark .glass-overlay {
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

/* 第三层：内容层[在毛玻璃层之上] */
.content-layer {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}

.animate-float-picture {
  animation: float-picture 5s linear 0ms infinite;
}

@keyframes float-picture {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
