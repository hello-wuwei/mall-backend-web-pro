import React from 'react'
import { Descriptions } from 'antd'
import Title from '../Title/index'
import moment from 'moment'
import { enmu_pay_types } from '@/enmu'

const PayInformation = ({ data }:{data:any}) => {
  return (
    <div>
      <Title>支付信息</Title>
      <Descriptions column={1}>
        <Descriptions.Item label="商品总金额">¥ {data.amount}</Descriptions.Item>
        <Descriptions.Item label="订单运费">¥ {data.freightAmount || 0}</Descriptions.Item>
        <Descriptions.Item label="优惠金额">¥ {data.promotionAmount || 0}</Descriptions.Item>
        <Descriptions.Item label="赠送天数">{data.orderScore || 0} 天</Descriptions.Item>
        <Descriptions.Item label="应付金额">¥ {data.payableAmount || 0}</Descriptions.Item>
        <Descriptions.Item label="实付金额">¥ {data.paymentAmount || 0}</Descriptions.Item>
        {/* { data.paymentTransactionCode ? <Descriptions.Item label="流水号">{data.paymentTransactionCode}</Descriptions.Item> : null } */}
        { data.paymentType !== undefined ? <Descriptions.Item label="支付方式">{enmu_pay_types.getName(data.paymentType)} <a>{data.paymentTransactionCode}</a></Descriptions.Item> : null }
        { data.paymentTime ? <Descriptions.Item label="支付时间">{moment(data.paymentTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item> : null }
      </Descriptions>
    </div>
  )
}

export default PayInformation