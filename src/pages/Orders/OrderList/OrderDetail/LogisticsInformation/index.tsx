import React from 'react'
import { Descriptions } from 'antd'
import Title from '../Title/index'

const LogisticsInformation = ({ data }:{data:any}) => {
  return (
    <div>
      <Title>物流信息</Title>
      { 
        data && data.trackingNumber ?
        <Descriptions column={1}>
          <Descriptions.Item label="物流公司">{data.logisticsCompanyName}</Descriptions.Item>
          <Descriptions.Item label="物流单号">
            {data.trackingNumber}
            <a target="_blank" href={`https://www.kuaidi100.com/chaxun?com=${data.logisticsCompanyCode}&nu=${data.trackingNumber}`}> 跳转查看</a>
          </Descriptions.Item>
        </Descriptions> :
        '暂无'
      }
    </div>
  )
}

export default LogisticsInformation