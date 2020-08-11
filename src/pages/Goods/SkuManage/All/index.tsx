import React from 'react'
import { GoTable } from 'components'
import { TableProps } from 'antd/es/table'
import { actions } from '../config'
import { enmu_sku_status } from '@/enmu'

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
  const columns = [
    {
      title: '商品信息',
      dataIndex: 'skuName'
    },
    {
      title: 'SKU ID',
      dataIndex: 'skuCode',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text:number) => enmu_sku_status.getName(text)
    },
    {
      title: '商品规格',
      dataIndex: 'propertyGroup',
    },
    {
      title: '商品品类',
      dataIndex: 'categoryName',
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
      title: '操作',
      dataIndex: 'action',
      render: actions()
    },
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