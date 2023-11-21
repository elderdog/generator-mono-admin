import moment from 'moment'
import { pageList } from '@/services/system/contract'
import { enumType } from '@/services/system/enums'
import type { ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Button, Tag } from 'antd'
import IconFont from '@~/components/IconFont'
import React from 'react'
import useEnum from '@~/hooks/enum'

const ContractList: React.FC = () => {
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl()
  const dict = useEnum(['ContractValidityState'], (type: string) => enumType({ name: type }))

  const columns: ProColumns<API.ChannelContractPageResp>[] = [
    {
      title: '合同编号',
      dataIndex: 'code'
    },
    {
      title: '合同名称',
      dataIndex: 'name',
      ellipsis: true,
      search: false
    },
    {
      title: '甲方',
      dataIndex: 'firstParty'
    },
    {
      title: '乙方',
      dataIndex: 'secondParty'
    },
    {
      title: '服务器起止日期',
      search: false,
      renderText: (_, record) => {
        const { startTime, endTime } = record
        return `${moment(startTime).format('YYYY-MM-DD')} 至 ${moment(endTime).format(
          'YYYY-MM-DD'
        )}`
      }
    },
    {
      title: '合同状态',
      dataIndex: 'validityState',
      initialValue: -1,
      valueType: 'select',
      // valueEnum: new Map([
      //   [-1, '全部'],
      //   [0, '未生效'],
      //   [1, '有效'],
      //   [2, '临期'],
      //   [3, '过期'],
      // ]),
      fieldProps: {
        options: [
          { value: -1, label: '全部' },
          ...(dict['ContractValidityState'] || [])
          // { value: 0, label: '未生效' },
          // { value: 1, label: '有效' },
          // { value: 2, label: '临期' },
          // { value: 3, label: '过期' },
        ],
        allowClear: false
      },
      search: {
        transform: (value, namePath) => {
          return { [namePath]: value === -1 ? undefined : value }
        }
      },
      render: (dom) => <Tag>{dom}</Tag>
    },
    {
      title: '合同套餐',
      search: false,
      dataIndex: 'packageCapacity',
      renderText: (text) => {
        return `${text}人`
      }
    },
    {
      title: '渠道',
      search: false,
      dataIndex: 'channelName'
    },
    {
      title: '操作',
      search: false,
      render: (text, record) => (
        <Button type="text" onClick={() => console.log(record)}>
          查看
        </Button>
      )
    }
  ]

  return (
    <PageContainer>
      <IconFont type="icon-plus" />
      <ProTable<API.ChannelContractPageResp, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form'
        })}
        rowKey="id"
        search={{ labelWidth: 120 }}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const { current: pageNum, ...rest } = params
          const resp = await pageList({ pageNum, ...rest })
          return {
            data: resp.rows,
            success: true,
            total: resp.total
          }
        }}
        columns={columns}
      />
    </PageContainer>
  )
}

export default ContractList
