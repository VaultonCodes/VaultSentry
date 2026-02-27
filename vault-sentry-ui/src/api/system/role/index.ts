// 导入二次封装axios
import request from '@/utils/axios.ts';
import type { ITableParams } from './type.ts';

// 统一管理接口
enum API {
  TEST_LIST_PAGE = '/api/mp',
  LIST_PAGE = '/api/sysRole/listPage',
  GET_BY_ID = '/api/sysRole/getById',
  UPDATE = '/api/sysRole/update',
  ADD = '/api/sysRole/add',
  DELETE = '/api/sysRole/deleteById',
  BATCH_DELETE = '/api/sysRole/batchDelete',
  UPDATE_STATUS = '/api/sysRole/updateStatus',
  LIST_NORMAL_ROLE = '/api/sysRole/listNormalRole',
  ASSIGN_USER_ROLE = '/api/sysRole/assignUserRole'
}
// 暴露请求函数
// 分页查询角色数据
export const testListPage = (pageNum: number, pageSize: number) => {
  return request.get(`${API.TEST_LIST_PAGE}/${pageNum}/${pageSize}`); // 第一种传参方式
  // return request.get(API.LIST_PAGE + `/${pageNum}/${pageSize}`); // 第二种传参方式
};

// 多条件分页查询数据
export const listPage = (params: ITableParams) => {
  return request.get(API.LIST_PAGE, params);
};

// 查询所有正常角色[穿梭框]
export const listNormalRole = (userId: any) => {
  return request.get(`${API.LIST_NORMAL_ROLE}/${userId}`);
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

// 根据当前用户ID分配角色
export const assignUserRole = (roleIds: any) => {
  if (!roleIds || roleIds.length === 0) {
    roleIds = [-1];
  }
  return request.post(API.ASSIGN_USER_ROLE, roleIds); // 第一种传参方式
};
