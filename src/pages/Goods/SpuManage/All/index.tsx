import React from 'react'
import { GoTable } from 'components'
import { TableProps } from 'antd/es/table'
import moment from 'moment'
import { actions } from '../config'
import { enmu_spu_status } from '@/enmu'

// rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys:any, selectedRows:any) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record:any) => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

type IProps = {
  getList: () => void
} & TableProps<any>

const Perfecting = (props:IProps) => {
  const { getList } = props
  const columns = [
    {
      title: 'SPU名称',
      dataIndex: 'spuName'
    },
    {
      title: '商品分类',
      dataIndex: 'categoryName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text:number) => enmu_spu_status.getName(text)
    },
    {
      title: '商品品牌',
      dataIndex: 'brandName',
    },
    {
      title: '经销商',
      dataIndex: 'merchantName',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      render: (text:any) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: actions(getList)
    }
  ]
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <GoTable {...props} columns={columns} />
      </div>
    </div>
  )
}

export default Perfecting