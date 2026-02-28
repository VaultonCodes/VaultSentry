// API 响应数据类型定义

// 登录响应数据
interface LoginResponse {
  tokenName: string;
  tokenValue: string;
}

// 菜单数据
interface MenuItem {
  menuId: number;
  menuName: string;
  parentId: number;
  menuType: string;
  path: string;
  name: string;
  component: string;
  icon: string;
  isVisible: string;
  linkUrl: string;
  isKeepAlive: string;
  isTag: string;
  isAffix: string;
  redirect: string;
}

// 用户信息
interface UserInfo {
  userId: number;
  loginName: string;
  sex: string;
  avatar: string;
}

// 登录用户信息响应数据
interface LoginUserInfoResponse {
  loginUser: UserInfo;
  roles: string[];
  buttons: string[];
}

// 通用 API 响应数据
interface ApiResponse<T = any> {
  status: number;
  msg: string;
  data: T;
}

// 导出类型
export type { LoginResponse, MenuItem, UserInfo, LoginUserInfoResponse, ApiResponse };
