import React from 'react'
import { Steps } from 'antd'
import Title from '../Title/index'
import moment from 'moment'

const { Step } = Steps

const OrderLogs = ({ data }:{data:any}) => {
  return (
    <div>
      <Title>订单日志</Title>
      <Steps direction="vertical" current={data.length - 1}>
        {
          data.map((step:any) => <Step key={step.createTime} title={moment(step.createTime).format('YYYY-MM-DD HH:mm:ss')} description={step.orderStatusDesc} />)
        }
      </Steps>
    </div>
  )
}

export default OrderLogs