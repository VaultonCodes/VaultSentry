// 统一的mock数据管理

// 登录接口mock数据
export const loginMockData = {
  success: {
    status: 200,
    msg: 'SUCCESS',
    data: {
      tokenName: 'Authorization',
      tokenValue: 'yB_CH5MUwIuTV9d7a_XnSXCBrQVL63PmfA__'
    }
  },
  failure: {
    code: 500,
    msg: '登录失败'
  }
};

// 菜单列表mock数据
export const menuListMockData = {
  status: 200,
  msg: 'SUCCESS',
  data: [
    {
      "menuId": 1,
      "menuName": "系统管理",
      "parentId": 0,
      "menuType": "1",
      "path": "/system",
      "name": "systemPage",
      "component": "",
      "icon": "vault-homepage",
      "isVisible": "1",
      "linkUrl": "",
      "isKeepAlive": "1",
      "isTag": "0",
      "isAffix": "0",
      "redirect": "/system/user"
    },
    {
      "menuId": 11,
      "menuName": "用户管理",
      "parentId": 1,
      "menuType": "2",
      "path": "/system/user",
      "name": "userPage",
      "component": "system/user/index",
      "icon": "vault-enhance-user",
      "isVisible": "1",
      "linkUrl": "",
      "isKeepAlive": "1",
      "isTag": "0",
      "isAffix": "0",
      "redirect": ""
    },
    {
      "menuId": 12,
      "menuName": "角色管理",
      "parentId": 1,
      "menuType": "2",
      "path": "/system/role",
      "name": "rolePage",
      "component": "system/role/index",
      "icon": "vault-user-search",
      "isVisible": "1",
      "linkUrl": "",
      "isKeepAlive": "1",
      "isTag": "0",
      "isAffix": "0",
      "redirect": ""
    },