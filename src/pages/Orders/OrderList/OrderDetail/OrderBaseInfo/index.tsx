import React from 'react'
import { Descriptions } from 'antd'
import Title from '../Title/index'
import moment from 'moment'
import { enmu_order_status } from '@/enmu'
import { joinAddress } from '@/util'

const OrderBaseInfo = ({ data }:{data:any}) => {
  return (
    <div>
      <Title>订单基本信息</Title>
      <Descriptions>
        <Descriptions.Item label="订单编号">{data.orderCode}</Descriptions.Item>
        <Descriptions.Item label="订单状态">{enmu_order_status.getName(data.orderStatus)}</Descriptions.Item>
        <Descriptions.Item label="下单时间">{moment(data.postTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        <Descriptions.Item label="下单人手机号">{data.userPhone}</Descriptions.Item>
        <Descriptions.Item label="收货人姓名">{data.addressDto.receiver}</Descriptions.Item>
        <Descriptions.Item label="收货人电话">{data.addressDto.phone}</Descriptions.Item>
        <Descriptions.Item label="收货地址">{joinAddress(data.addressDto)}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default OrderBaseInfo