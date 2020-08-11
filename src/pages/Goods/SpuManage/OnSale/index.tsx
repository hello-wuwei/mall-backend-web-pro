import React, { useState } from 'react'
import { Button } from 'antd'
import { GoTable } from 'components'
import { TableProps } from 'antd/es/table'
import moment from 'moment'
import { actions, onBatchSale } from '../config'

type IProps = {
  getList: () => void
} & TableProps<any>

const OnSale = (props:IProps) => {
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
      title: '商品品牌',
      dataIndex: 'brandName',
    },
    {
      title: '经销商',
      dataIndex: 'merchantName',
    },
    {
      title: '包含SKU',
      dataIndex: 'skuQuantity',
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
    },
  ]

  const [ codeList, setCodeList ] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys:any) => {
      setCodeList(selectedRowKeys)
    }
  };

  const successCallback = () => {
    setCodeList([])
    getList()
  }

  return (
    <div>
      <div>
        {/* <Button style={{ marginRight: 16 }}>批量操作</Button>
        <Button icon="dash" style={{ marginRight: 16 }}></Button> */}
        <Button type="primary" disabled={!codeList.length} onClick={() => onBatchSale(codeList, 4, successCallback)}>批量下架</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <GoTable rowSelection={rowSelection} {...props} columns={columns} />
      </div>
    </div>
  )
}

export default OnSale