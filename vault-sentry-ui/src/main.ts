import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import directive from './directive';
import './mock';
import App from './App.vue';
import store from './store';
import globalErrorHandler from '@/utils/monitor';
const app = createApp(App);
import '@/assets/style/global.less';
import '@/assets/style/layout.less';
import '@/assets/style/chart.less';
import '@/assets/style/arco-extends.less';
import '@/api/interceptor';
app.use(ArcoVue, {});

app.use(router);
app.use(store);
app.use(globalComponents);
app.use(directive);

// 全局异常处理
globalErrorHandler(app);
app.use(ArcoVueIcon);



app.mount('#app');
