// 导入二次封装axios
import request from '@/utils/axios.ts';
// 引入接口类型
import type { ILoginParams } from './type.ts';

// 统一管理接口
enum API {
  LOGIN = '/auth/login',
  DYNAMIC_DATA = '/api/sysLoginUser/getLoginUserInfo',
  USERINFO = '/user/info',
  LIST_PAGE = '/api/sysLoginUser/listPage',
  GET_BY_ID = '/api/sysLoginUser/getById',
  UPDATE = '/api/sysLoginUser/update',
  ADD = '/api/sysLoginUser/add',
  DELETE = '/api/sysLoginUser/deleteById',
  BATCH_DELETE = '/api/sysLoginUser/batchDelete',
  UPDATE_STATUS = '/api/sysLoginUser/updateStatus'
}
// 暴露请求函数
// 登录接口方法
export const login = (params: ILoginParams) => {
  return request.post(API.LOGIN, params);
};

// 通过token查询相关用户信息、按钮权限、菜单权限数据，token必须有效
export const dynamicData = () => {
  return request.get(API.DYNAMIC_DATA);
};

// 查询用户信息
export const userInfo = (params: ILoginParams) => {
  return request.get(API.USERINFO, params);
};

// 多条件分页查询数据
export const listPage = (params: any) => {
  return request.get(API.LIST_PAGE, params);
};

// 根据ID进行查询
export const getById = (id: any) => {
  return request.get(`${API.GET_BY_ID}/${id}`);
};

// 根据ID进行修改
export const update = (data: any) => {
  return request.post(API.UPDATE, data);
};

// 添加
export const add = (data: any) => {
  if (!data.postIds || data.postIds.length === 0) {
    data.postIds = [-1];
  }
  if (!data.roleIds || data.roleIds.length === 0) {
    data.roleIds = [-1];
  }
  return request.post(API.ADD, data);
};

// 删除
export const deleteById = (id: any) => {
  return request.post(`${API.DELETE}/${id}`);
};

// 批量删除
export const batchDelete = (ids: any) => {
  return request.post(API.BATCH_DELETE, ids); // 第一种传参方式
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return request.post(`${API.UPDATE_STATUS}/${id}/${status}`); // 第一种传参方式
};
