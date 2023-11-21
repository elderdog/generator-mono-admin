// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 枚举字段详情 枚举字段详情 GET /enum-base/type/${param0} */
export async function enumType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enumTypeParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.RMapObjectString>(`/enum-base/type/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 枚举字段详情列表 枚举字段详情列表 GET /enum-base/types */
export async function enumTypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enumTypesParams,
  options?: { [key: string]: any },
) {
  return request<API.RMapStringMapObjectString>('/enum-base/types', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
