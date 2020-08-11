import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
// import styles from './index.module.less'
import { GoTitle } from 'components'
import history from '@/history'
import OrderBaseInfo from './OrderBaseInfo'
import GoodBaseInfo from './GoodBaseInfo'
import PayInformation from './PayInformation'
import LogisticsInformation from './LogisticsInformation'
import OrderLogs from './OrderLogs'
import api from '@/api';
import SendGoodsModal from './SendGoodsModal'

type TParams = { orderCode: string }

const OrderDetail = ({ match }:RouteComponentProps<TParams>) => {
  const orderCode = match.params.orderCode
  const [ order, setOrder ] = useState<any>(null)
  const getOrderDetail = async () => {
    const res = await api.order.getOrderDetail({ orderCode })
    setOrder(res.data)
  }

  useEffect(() => {
    getOrderDetail()
  }, [])

  const [ visible, setVisible ] = useState(false)

  if (!order) {
    return null
  }


  return (
    <div className='go-main-info-page'>
      <SendGoodsModal orderCode={orderCode} visible={visible} setVisible={setVisible} />
      <div className="title">
        <GoTitle
          style={{ marginBottom: 40 }}
          action={
            <div>
              { order.orderBaseDTO.orderStatus === 2 ? <Button style={{ marginRight: 16 }} type="primary" onClick={() => setVisible(true)}>发货</Button> : null }
              <Button onClick={() => history.goBack()}>返回</Button>
            </div>
          }
        >
          订单详情
        </GoTitle>
      </div>
      
      <div className="go-content">
        <div className="go-column-box">
          <OrderBaseInfo data={order.orderBaseDTO} />
        </div>
        <div className="go-column-box">
          <GoodBaseInfo data={order.orderProductDTO} />
        </div>
        <div className="go-column-box">
          <PayInformation data={order.orderPaymentDTO} />
        </div>
        <div className="go-column-box">
          <LogisticsInformation data={order.orderShipmentDTO} />
        </div>
        <div className="go-column-box">
          <OrderLogs data={order.orderLogDTOList} />
        </div>
      </div>
    </div>
  )
}


export default OrderDetail