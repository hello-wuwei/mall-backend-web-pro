import React from 'react'
import { GoTable } from 'components'
import Title from '../Title/index'

const columns = [
  {
    title: 'SKUID',
    dataIndex: 'skuCode'
  },
  {
    title: '商品名称',
    dataIndex: 'skuName',
    render: (text:any, record:any) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ width: 60, height: 60 }}><img style={{ width: '100%' }} src={record.skuImageUrl} /></p>
        <span>{text}</span>
      </div>
    )
  },
  {
    title: '商品规格',
    dataIndex: 'propertyList',
    render: (propertyList:any) => propertyList.map((property:any) => property.propertyValue).join(' ')
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '供应商',
    dataIndex: 'merchantName',
  },
  {
    title: '单品零售价（元）',
    dataIndex: 'unitPrice',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
  },
  {
    title: '赠送天数（天）',
    dataIndex: 'totalScore',
  },
  {
    title: '应付金额（元）',
    dataIndex: 'totalAmount',
  }
]

const GoodBaseInfo = ({ data }:{data:any}) => {
  return (
    <div>
      <Title>商品基本信息</Title>
      <GoTable rowKey="skuCode" columns={columns} dataSource={data.orderDetailDTOList} pagination={false} />
      <div style={{ textAlign: 'right', lineHeight: '50px', paddingRight: '40px' }}>
        <span style={{ fontWeight: 'bold' }}>总赠送天数：</span>{data.totalScore} 天
        <span style={{ fontWeight: 'bold', marginLeft: '30px' }}>总金额：</span>¥ {data.totalPrice}
      </div>
    </div>
  )
}

export default GoodBaseInfo