// 用户登录
const login = {
  tokenName: 'Authorization',
  tokenValue: 'yB_CH5MUwIuTV9d7a_XnSXCBrQVL63PmfA__'
};

export default [
  // 用户登录接口
  {
    url: '/mock/user/login', // 请求地址
    method: 'post', // 请求方式
    response: ({ body }) => {
      // 获取请求体携带过来的用户名与密码
      const { loginName, password, securityCode } = body;
      if (loginName === 'admin' && password === '123456' && securityCode === '1234') {
        return { status: 200, msg: 'SUCCESS', data: login };
      }
      return { code: 500, msg: '登录失败' };
    }
  }
];
