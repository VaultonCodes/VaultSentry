import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Components from '@/components/index.ts';
import Directives from '@/directives/index';
import App from './App.vue';
import pinia from './stores/index.ts';
import router from './routers';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'virtual:svg-icons-register';
import 'animate.css';
import '@/styles/index.scss';
import 'uno.css';

// 创建app
const app = createApp(App);
// 注册ElementPlus
app.use(ElementPlus);
// 注册ElementPlus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册路由
app.use(router);
// 注册pinia
app.use(pinia);
// 注册自定义组件
app.use(Components);
// 注册全局自定义指令
app.use(Directives);
// 挂载
app.mount('#app');
