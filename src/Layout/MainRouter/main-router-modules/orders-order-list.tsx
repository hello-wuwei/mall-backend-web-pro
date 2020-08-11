import React, { lazy } from 'react'
import { WrapRoute } from 'components'
const OrderList = lazy(() => import('@/pages/Orders/OrderList'))
const OrderDetail = lazy(() => import('@/pages/Orders/OrderList/OrderDetail'))

export default [
  <WrapRoute path="/order-list" key="/order-list" component={OrderList} />,
  <WrapRoute path="/order-detail/:orderCode" key="/order-detail/:orderCode" component={OrderDetail} />
]