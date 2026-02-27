import type { App, Component } from 'vue';
import VaultSvgIcon from './VaultSvgIcon/Index.vue';
import VaultDialog from './VaultDialog/Index.vue';
import VaultDrawer from './VaultDrawer/Index.vue';
import VaultToolbar from './VaultToolbar/Index.vue';
import VaultTag from './VaultTag/Index.vue';
import VaultSelectIcon from './VaultSelectIcon/Index.vue';
import VaultUploadFiles from './VaultUpload/Files.vue';
import VaultUploadImage from './VaultUpload/Image.vue';
import VaultUploadImages from './VaultUpload/Images.vue';
import VaultExcel from './VaultExcel/Index.vue';
import VaultTagFilter from './VaultTagFilter/Index.vue';
import VaultCard from './VaultCard/Index.vue';
import VaultGlobalIcon from './VaultGlobalIcon/Index.vue';
import VaultSearch from './VaultSearch/Index.vue';

/** 对外暴露插件对象，注册全局组件 */
const components: { [name: string]: Component } = {
  VaultSvgIcon,
  VaultDialog,
  VaultDrawer,
  VaultToolbar,
  VaultTag,
  VaultSelectIcon,
  VaultUploadFiles,
  VaultUploadImage,
  VaultUploadImages,
  VaultExcel,
  VaultTagFilter,
  VaultCard,
  VaultGlobalIcon,
  VaultSearch
};

export default {
  // install方法， Object.keys()得到对象所有的key
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  }
};
