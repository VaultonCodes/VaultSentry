// 导入二次封装axios
import request from '@/utils/axios.ts';

// 统一管理接口
enum API {
  LIST_PAGE = '/api/sysPost/listPage',
  GET_BY_ID = '/api/sysPost/getById',
  UPDATE = '/api/sysPost/update',
  ADD = '/api/sysPost/add',
  DELETE = '/api/sysPost/deleteById',
  BATCH_DELETE = '/api/sysPost/batchDelete',
  UPDATE_STATUS = '/api/sysPost/updateStatus'
}

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
