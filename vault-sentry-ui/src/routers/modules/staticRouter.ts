import type { RouteRecordRaw } from 'vue-router';
import { HOME_URL, LOGIN_URL } from '@/config';
import Layout from '@/layouts/index.vue';

export const layoutRouter: RouteRecordRaw[] = [
  {
    // 登录成功以后展示数据的路由[一级路由，可以将子路由放置Main模块中(核心)]
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: HOME_URL,
    children: [
      {
        path: '/system/personage',
        name: 'personagePage',
        component: () => import('@/views/system/personage/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'QuestionFilled',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0'
        }
      },
      {
        path: '/system/dict/data/:dictType',
        name: 'dictDataPage',
        component: () => import('@/views/system/dict/data.vue'),
        meta: {
          title: '字典值',
          icon: '',
          isVisible: '0',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          activeMenu: '/system/dict/type'
        }
      }
    ]
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'menu.login.auth'
    }
  }
];

/**
 * staticRouter[静态路由]
 */
export const staticRouter: RouteRecordRaw[] = [
  /** 主控台 */
  // {
  //   path: HOME_URL, // [唯一]
  //   name: "homePage", // [唯一]
  //   component: () => import("@/views/home/index.vue"),
  //   meta: {
  //     menuId: "-2", // menuId 和 activeMenu 的值必须有一个存在[唯一]
  //     title: "menu.home.auth", // 标题
  //     icon: "vault-home", // 图标 HomeFilled
  //     isVisible: "1", // 代表路由在菜单中是否显示[1显示，0隐藏]
  //     linkUrl: "", // 是否外链[有值则是外链]
  //     isKeepAlive: "1", // 是否缓存路由数据[1是，0否]
  //     isTag: "0", // 是否显示标签[1是，0否]
  //     isAffix: "1" // 是否缓存固定路由[1是，0否]
  //   }
  // },
];

/**
 * errorRouter[错误页面路由]
 */
export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      menuId: '-403',
      title: 'menu.coding.403.name',
      icon: 'QuestionFilled', // 菜单图标
      isVisible: '1', // 代表路由在菜单中是否显示[1显示，0隐藏]
      linkUrl: '', // 是否外链[有值则是外链]
      isKeepAlive: '1', // 是否缓存路由数据[1是，0否]
      isTag: '0', // 是否显示标签[1是，0否]
      isAffix: '0' // 是否缓存固定路由[1是，0否]
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      menuId: '-404',
      title: 'menu.coding.404.name',
      icon: 'CircleCloseFilled', // 菜单图标
      isVisible: '1', // 代表路由在菜单中是否显示[1显示，0隐藏]
      linkUrl: '', // 是否外链[有值则是外链]
      isKeepAlive: '1', // 是否缓存路由数据[1是，0否]
      isTag: '0', // 是否显示标签[1是，0否]
      isAffix: '0' // 是否缓存固定路由[1是，0否]
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      menuId: '-500',
      title: 'menu.coding.500.name',
      icon: 'WarningFilled', // 图标
      isVisible: '1', // 代表路由在菜单中是否显示[1显示，0隐藏]
      linkUrl: '', // 是否外链[有值则是外链]
      isKeepAlive: '1', // 是否缓存路由数据[1是，0否]
      isTag: '0', // 是否显示标签[1是，0否]
      isAffix: '0' // 是否缓存固定路由[1是，0否]
    }
  },
  // 找不到path将跳转404页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  }
];
