// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户信息 获取用户信息 GET /user */
export async function userInfo(options?: { [key: string]: any }) {
  return request<API.RUserInfoResp>('/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改密码, 修改成功后会退出登录 修改密码, 修改成功后会退出登录 PUT /user/pwd/change */
export async function changePwd(body: API.ChangeUserPwdReq, options?: { [key: string]: any }) {
  return request<API.RVoid>('/user/pwd/change', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
