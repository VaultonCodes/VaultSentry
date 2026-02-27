// 导入二次封装axios
import request from '@/utils/axios.ts';
// import { ITableParams } from "./type.ts";

// 统一管理接口
enum API {
  LIST_DICT_TYPE = '/api/sysDictType/listDictType',
  LIST_PAGE = '/api/sysDictData/listPage',
  GET_BY_ID = '/api/sysDictData/getById',
  UPDATE = '/api/sysDictData/update',
  ADD = '/api/sysDictData/add',
  DELETE = '/api/sysDictData/deleteById',
  BATCH_DELETE = '/api/sysDictData/batchDelete',
  UPDATE_STATUS = '/api/sysDictData/updateStatus',
  LIST_DATA_BY_TYPE = '/api/sysDictData/listDataByType'
}
// 暴露请求函数
// 条件下拉框
export const listDictType = () => {
  return request.get(API.LIST_DICT_TYPE);
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
  return request.post(API.ADD, data);
};

// 删除
export const deleteById = (id: any) => {
  return request.post(`${API.DELETE}/${id}`); // 第一种传参方式
};

// 批量删除
export const batchDelete = (ids: any) => {
  return request.post(API.BATCH_DELETE, ids); // 第一种传参方式
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return request.post(`${API.UPDATE_STATUS}/${id}/${status}`); // 第一种传参方式
};

// 根据字典类型查询数据
export const listDataByType = (dictType: any) => {
  return request.get(`${API.LIST_DATA_BY_TYPE}/${dictType}`); // 第一种传参方式
};
