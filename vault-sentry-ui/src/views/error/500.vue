<script setup lang="ts">
import { useRouter } from 'vue-router';
import { HOME_URL } from '@/config/index.ts';

// 路由跳转
const router = useRouter();

const handleHomePage = () => {
  router.push({ path: HOME_URL });
};
</script>

<template>
  <div id="box">
    <div id="banner" class="koi-top"></div>
    <div class="koi-bottom">
      <div class="koi-text1">500</div>
      <div class="koi-text2">服务器好像开小差了！请稍后试试...😱</div>
      <div class="h-20px"></div>
      <ElButton type="primary" plain @click="handleHomePage">返回首页</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#box {
  overflow: hidden;
}
#banner {
  margin-top: 60px;
  background: url('@/assets/images/error/500.png') no-repeat;
  background-size: 100%;
}
.koi-top {
  width: 600px;
  height: 500px;
  margin: 0 auto;
}
.koi-bottom {
  height: 300px;
  margin-top: 20px;
  text-align: center;
}
.koi-text1 {
  font-size: 46px;
  font-weight: bold;
}
.koi-text2 {
  padding-top: 30px;
  font-family: YouYuan;
  font-size: 24px;
  font-weight: 600;
}
</style>
