// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 生成验证码 生成验证码 GET /captchaImage */
export async function getCode(options?: { [key: string]: any }) {
  return request<API.RMapStringObject>('/captchaImage', {
    method: 'GET',
    ...(options || {}),
  });
}
