import React, { useState } from 'react'
import { Button } from 'antd'
import { GoTable } from 'components'
import history from '@/history'
import { TableProps } from 'antd/es/table'
import moment from 'moment'
import { actions, onBatch } from '../config'

// const onAdd = () => {
//   history.push({ pathname: '/spu-add-edit', state: { spuCode: null } })
// }
type IProps = {
  getList: () => void
} & TableProps<any>

const Perfecting = (props:IProps) => {
  const { getList } = props
  const [ codeList, setCodeList ] = useState([])
// rowSelection object indicates the need for row selection

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
      render: actions(getList)
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys:any) => {
      setCodeList(selectedRowKeys)
    }
  }

  const successCallback = () => {
    setCodeList([])
    getList()
  }

  return (
    <div>
      <div>
        <Button type="primary" disabled={!codeList.length} onClick={() => onBatch(codeList, 5, successCallback)}>批量下架</Button>
      </div>
      
      <div style={{ marginTop: 20 }}>
        <GoTable rowSelection={rowSelection} {...props} columns={columns} />
      </div>
    </div>
  )
}

export default Perfecting