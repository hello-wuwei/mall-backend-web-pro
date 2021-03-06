import React, { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { GoTable } from 'components'
import { TableProps } from 'antd/es/table'
import moment from 'moment'
import { actions, onBatch } from '../config'
import api from '@/api'

type IProps = {
  getList: () => void
} & TableProps<any>

const Perfected = (props:IProps) => {
  const { getList } = props
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
      title: '市场价（元）',
      dataIndex: 'originalPrice',
    },
    {
      title: '销售价（元）',
      dataIndex: 'price',
    },
    {
      title: '采购价（元）',
      dataIndex: 'purchasePrice',
    },
    {
      title: '赠送天数（天）',
      dataIndex: 'score',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   render: actions(getList)
    // }
  ];

  const [ codeList, setCodeList ] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys:any) => {
      setCodeList(selectedRowKeys)
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  const successCallback = () => {
    setCodeList([])
    getList()
  }

  return (
    <div>
      {/* <div>
        <Button type="primary" disabled={!codeList.length} onClick={() => onBatch(codeList, 3, successCallback)}>批量上架</Button>
      </div> */}
      <div style={{ marginTop: 20 }}>
        <GoTable
        //  rowSelection={rowSelection}
         {...props}
         columns={columns}
        />
      </div>
    </div>
  )
}

export default Perfected