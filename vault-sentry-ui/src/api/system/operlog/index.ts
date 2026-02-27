// 导入二次封装axios
import request from '@/utils/axios.ts';

// 统一管理接口
enum API {
  LIST_PAGE = '/api/sysOperLog/listPage',
  GET_BY_ID = '/api/sysOperLog/getById',
  DELETE = '/api/sysOperLog/deleteById',
  BATCH_DELETE = '/api/sysOperLog/batchDelete',
  GET_DETAIL_BY_ID = '/api/sysOperLog/getDetailById'
}

// 多条件分页查询数据
export const listPage = (params: any) => {
  return request.get(API.LIST_PAGE, params);
};

// 根据ID进行查询
export const getById = (id: any) => {
  return request.get(`${API.GET_BY_ID}/${id}`);
};

// 删除
export const deleteById = (id: any) => {
  return request.post(`${API.DELETE}/${id}`);
};

// 批量删除
export const batchDelete = (ids: any) => {
  return request.post(API.BATCH_DELETE, ids); // 第一种传参方式
};

// 根据ID查询详情
export const getDetailById = (id: any) => {
  return request.get(`${API.GET_DETAIL_BY_ID}/${id}`);
};
