// 统一API服务层，直接返回静态数据
import type { ApiResponse, LoginResponse, LoginUserInfoResponse, MenuItem } from '@/types/api';

// 登录接口
export const login = (params: any): Promise<ApiResponse<LoginResponse>> => {
  // 直接返回静态数据
  return new Promise(resolve => {
    // 模拟登录逻辑
    if (
      params.securityCode === '1234' &&
      ((params.loginName === 'admin' && params.password === '123456') ||
        (params.loginName === 'yuadmin' && params.password === 'yuadmin123'))
    ) {
      resolve({
        status: 200,
        msg: 'SUCCESS',
        data: {
          tokenName: 'Authorization',
          tokenValue: 'yB_CH5MUwIuTV9d7a_XnSXCBrQVL63PmfA__'
        }
      });
    } else {
      resolve({ status: 500, msg: '登录失败', data: { tokenName: '', tokenValue: '' } });
    }
  });
};

// 获取后端菜单扁平化路由
export const listRouters = (): Promise<ApiResponse<MenuItem[]>> => {
  // 直接返回静态数据
  return new Promise(resolve => {
    resolve({
      status: 200,
      msg: 'SUCCESS',
      data: [
        {
          menuId: 2,
          menuName: '主控台',
          parentId: 0,
          menuType: '1',
          path: '/',
          name: 'indexPage',
          component: '',
          icon: 'vault-homepage',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: '/home'
        },
        {
          menuId: 21,
          menuName: '工作台',
          parentId: 2,
          menuType: '2',
          path: '/home',
          name: 'homePage',
          component: 'home/index',
          icon: 'vault-work',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 1,
          menuName: '系统管理',
          parentId: 0,
          menuType: '1',
          path: '/system',
          name: 'systemPage',
          component: '',
          icon: 'vault-homepage',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: '/system/user'
        },
        {
          menuId: 13,
          menuName: '菜单管理',
          parentId: 1,
          menuType: '2',
          path: '/system/menu',
          name: 'menuPage',
          component: 'system/menu/index',
          icon: 'vault-slack',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 14,
          menuName: '字典管理',
          parentId: 1,
          menuType: '2',
          path: '/system/dict',
          name: 'dictPage',
          component: 'system/dict/type',
          icon: 'vault-slack',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 11,
          menuName: '用户管理',
          parentId: 1,
          menuType: '2',
          path: '/system/user',
          name: 'userPage',
          component: 'system/user/index',
          icon: 'vault-enhance-user',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 16,
          menuName: '登录日志',
          parentId: 1,
          menuType: '2',
          path: '/system/loginlog',
          name: 'loginLogPage',
          component: 'system/loginlog/index',
          icon: 'vault-slack',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 15,
          menuName: '操作日志',
          parentId: 1,
          menuType: '2',
          path: '/system/operlog',
          name: 'operLogPage',
          component: 'system/operlog/index',
          icon: 'vault-slack',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 17,
          menuName: '通知模板',
          parentId: 1,
          menuType: '2',
          path: '/system/notice',
          name: 'noticePage',
          component: 'system/notice/index',
          icon: 'vault-slack',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 12,
          menuName: '角色管理',
          parentId: 1,
          menuType: '2',
          path: '/system/role',
          name: 'rolePage',
          component: 'system/role/index',
          icon: 'vault-user-search',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        },
        {
          menuId: 18,
          menuName: '系统设置',
          parentId: 1,
          menuType: '2',
          path: '/system/setting',
          name: 'settingPage',
          component: 'system/setting/index',
          icon: 'vault-user-search',
          isVisible: '1',
          linkUrl: '',
          isKeepAlive: '1',
          isTag: '0',
          isAffix: '0',
          redirect: ''
        }
      ]
    });
  });
};

// 获取角色数据 AND 按钮数据 AND 用户信息
export const getLoginUserInfo = (): Promise<ApiResponse<LoginUserInfoResponse>> => {
  // 直接返回静态数据
  return new Promise(resolve => {
    resolve({
      status: 200,
      msg: 'SUCCESS',
      data: {
        loginUser: {
          userId: 1,
          loginName: 'VAULT-ADMIN',
          sex: '1',
          avatar:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae90b4c7-98b6-4a47-b1b3-9ee8bc71acf6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692146441&t=6fca60f3a0d323869b81d8fb53b5dd1b'
        },
        roles: ['SUPER-ADMIN'],
        buttons: [
          'system:role:search',
          'system:role:list',
          'system:role:add',
          'system:role:delete',
          'system:role:update',
          'system:role:import',
          'system:role:export'
        ]
      }
    });
  });
};
