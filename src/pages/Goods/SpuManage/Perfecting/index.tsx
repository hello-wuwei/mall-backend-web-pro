import React from 'react'
import { Button } from 'antd'
import { GoTable } from 'components'
import history from '@/history'
import { TableProps } from 'antd/es/table'
import moment from 'moment'
import { actions } from '../config'

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
    render: actions()
  },
]

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

// const onAdd = () => {
//   history.push({ pathname: '/spu-add-edit', state: { spuCode: null } })
// }

const Perfecting = (props:TableProps<any>) => {
  return (
    <div>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon="plus" style={{ marginRight: 16 }} onClick={onAdd}>添加SPU</Button>
        <Button type="primary">从外部导入</Button>
      </div> */}
      {/* <div>
        <Button style={{ marginRight: 16 }}>批量操作</Button>
        <Button icon="dash" style={{ marginRight: 16 }}></Button>
        <Button>删除</Button>
      </div> */}
      <div style={{ marginTop: 20 }}>
        <GoTable
          // rowSelection={rowSelection}
          {...props}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default Perfecting