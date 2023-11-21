declare namespace API {
  type ChangeUserPwdReq = {
    originalPassword: string;
    password: string;
    confirmPassword: string;
  };

  type ChannelContractPageReq = {
    /** 合同编号 */
    code?: string;
    /** 甲方 */
    firstParty?: string;
    /** 乙方 */
    secondParty?: string;
    /** 合同请求状态 */
    validityState?: 'NOT_EFFECTIVE' | 'EFFECTIVE' | 'EXPIRING' | 'EXPIRED';
  };

  type ChannelContractPageResp = {
    /** 主键id */
    id?: number;
    /** 合同名称 */
    name?: string;
    /** 合同编号 */
    code?: string;
    /** 甲方 */
    firstParty?: string;
    /** 乙方 */
    secondParty?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 套餐容量 */
    packageCapacity?: number;
    /** 关联渠道id */
    channelId?: number;
    /** 关联渠道名称 */
    channelName?: string;
    /** 记录状态 */
    validityState?: 'NOT_EFFECTIVE' | 'EFFECTIVE' | 'EXPIRING' | 'EXPIRED';
  };

  type ChannelContractResp = {
    id?: number;
    /** 合同名称 */
    name?: string;
    /** 合同编号 */
    code?: string;
    /** 甲方 */
    firstParty?: string;
    /** 乙方 */
    secondParty?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 套餐容量 */
    packageCapacity?: number;
    /** 关联渠道id */
    channelId?: number;
    /** 文件列表 */
    files?: string[];
    /** 备注 */
    remark?: string;
    /** 关联渠道名称 */
    channelName?: string;
    /** 记录状态 */
    validityState?: 'NOT_EFFECTIVE' | 'EFFECTIVE' | 'EXPIRING' | 'EXPIRED';
  };

  type enumTypeParams = {
    /** 枚举类名(忽略大小写) */
    name: string;
  };

  type enumTypesParams = {
    /** 枚举类名集合(忽略大小写) */
    names: string[];
  };

  type getInfoParams = {
    /** id */
    id: number;
  };

  type LoginResp = {
    /** token */
    token?: string;
  };

  type pageListParams = {
    /** 分页大小 */
    pageSize?: number;
    /** 当前页数 */
    pageNum?: number;
    /** 合同编号 */
    code?: string;
    /** 甲方 */
    firstParty?: string;
    /** 乙方 */
    secondParty?: string;
    /** 合同请求状态 */
    validityState?: number;
  };

  type PageQuery = {
    /** 分页大小 */
    pageSize?: number;
    /** 当前页数 */
    pageNum?: number;
    /** 排序列 */
    orderByColumn?: string;
    /** 排序的方向desc或者asc */
    isAsc?: string;
  };

  type PwLoginReq = {
    /** 用户名 */
    username: string;
    /** 用户密码 */
    password: string;
    /** 验证码 */
    code?: string;
    /** 唯一标识 */
    uuid?: string;
  };

  type RChannelContractResp = {
    code?: number;
    msg?: string;
    data?: ChannelContractResp;
  };

  type RLoginResp = {
    code?: number;
    msg?: string;
    data?: LoginResp;
  };

  type RMapObjectString = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type RMapStringMapObjectString = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type RMapStringObject = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type RUserInfoResp = {
    code?: number;
    msg?: string;
    data?: UserInfoResp;
  };

  type RVoid = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type TableDataInfoChannelContractPageResp = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: ChannelContractPageResp[];
    /** 消息状态码 */
    code?: number;
    /** 消息内容 */
    msg?: string;
  };

  type UserInfoResp = {
    /** 用户id */
    id?: number;
    /** 用户名 */
    username?: string;
    /** 渠道id */
    channelId?: number;
    /** 渠道名称 */
    channelName?: string;
  };
}
