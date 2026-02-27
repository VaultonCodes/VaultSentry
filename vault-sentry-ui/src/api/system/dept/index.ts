// 导入二次封装axios
import request from '@/utils/axios.ts';

// 统一管理接口
enum API {
  LIST = '/api/sysDept/list',
  CASCADER_LIST = '/api/sysDept/cascaderList',
  GET_BY_ID = '/api/sysDept/getById',
  UPDATE = '/api/sysDept/update',
  ADD = '/api/sysDept/add',
  DELETE = '/api/sysDept/deleteById',
  BATCH_DELETE = '/api/sysDept/batchDelete',
  UPDATE_STATUS = '/api/sysDept/updateStatus',
  UPDATE_SPREAD = '/api/sysDept/updateSpread'
}

// 多条件分页查询
export const list = (params: any) => {
  return request.get(API.LIST, params);
};

// 部门级联下拉框
export const cascaderList = () => {
  return request.get(API.CASCADER_LIST);
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

// 修改状态
export const updateSpread = (id: any, spread: any) => {
  return request.post(`${API.UPDATE_SPREAD}/${id}/${spread}`); // 第一种传参方式
};
