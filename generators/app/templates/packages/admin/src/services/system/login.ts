// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录方法 登录方法 POST /login */
export async function login(body: API.PwLoginReq, options?: { [key: string]: any }) {
  return request<API.RLoginResp>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 退出登录 POST /logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.RVoid>('/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
