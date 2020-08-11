import React from 'react'
import { Button } from 'antd'
import history from '@/history'
import moment from 'moment'
import { enmu_order_status } from '@/enmu'

const columns = [
  {
    title: '订单编号',
    dataIndex: 'orderCode'
  },
  {
    title: '收货人',
    dataIndex: 'receiver',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
  },
  {
    title: '订单支付总额（元）',
    dataIndex: 'paymentAmount',
  },
  {
    title: '赠送天数（天）',
    dataIndex: 'orderScore',
  },
  {
    title: '供应商',
    dataIndex: 'merchantName',
  },
  {
    title: '下单时间',
    dataIndex: 'postTime',
    render: (value:any) => moment(value).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    render: (value:any) => enmu_order_status.getName(value)
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: (value: any, record:any) => <Button type="link" onClick={() => history.push(`/order-detail/${record.orderCode}`)}>订单详情</Button>
  }
]

const pathKeyMap:any = {
  '/order-list': '',
  '/order-list/obligations': '0',
  '/order-list/paid': '2',
  '/order-list/shipped': '3',
  '/order-list/completed': '4',
  '/order-list/canceled': '5'
}

const keyPathMap:any = {
  '': '/order-list',
  '0': '/order-list/obligations',
  '2': '/order-list/paid',
  '3': '/order-list/shipped',
  '4': '/order-list/completed',
  '5': '/order-list/canceled'
}

export { columns, pathKeyMap, keyPathMap }