import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import GoodsSpuManage from './main-router-modules/goods-spu-manage'
import GoodsSkuManage from './main-router-modules/goods-sku-manage'
import GoodsSkuPriceManage from './main-router-modules/goods-sku-price-manage'
import GoodsClassifyManage from './main-router-modules/goods-classify-manage'
import GoodsBrandManage from './main-router-modules/goods-brand-manage'
import GoodsSupplierManage from './main-router-modules/goods-supplier-manage'

import OrdersOrderList from './main-router-modules/orders-order-list'

const mainRouters = [
  ...GoodsSpuManage,
  ...GoodsSkuManage,
  ...GoodsSkuPriceManage,
  ...GoodsClassifyManage,
  ...GoodsBrandManage,
  ...GoodsSupplierManage,

  ...OrdersOrderList
]

const MainRouter = () => (
  <Switch>
    {mainRouters}
    <Redirect path='/' to="/spu-manage/perfecting" />
  </Switch>
)

export default MainRouter