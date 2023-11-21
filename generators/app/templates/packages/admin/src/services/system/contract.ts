// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 合同详情 合同详情 GET /channel-contract/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RChannelContractResp>(`/channel-contract/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询合同列表 查询合同列表 GET /channel-contract/list */
export async function pageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageListParams,
  options?: { [key: string]: any },
) {
  return request<API.TableDataInfoChannelContractPageResp>('/channel-contract/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
