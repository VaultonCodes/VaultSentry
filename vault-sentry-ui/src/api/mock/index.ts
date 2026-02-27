// 导入二次封装axios
import request from '@/utils/axios.ts';

// 统一管理接口
enum API {
  LOGIN = '/mock/user/login',
  LIST_ROUTERS = '/mock/auth/listRouters',
  GET_LOGIN_USER_INFO = '/mock/auth/getLoginUserInfo'
}

// 登录接口方法
export const login = (params: any) => {
  return request.post(API.LOGIN, params);
};

// 获取后端菜单扁平化路由
export const listRouters = () => {
  return request.get(API.LIST_ROUTERS);
};

// 获取角色数据 AND 按钮数据 AND 用户信息
export const getLoginUserInfo = () => {
  return request.get(API.GET_LOGIN_USER_INFO);
};
