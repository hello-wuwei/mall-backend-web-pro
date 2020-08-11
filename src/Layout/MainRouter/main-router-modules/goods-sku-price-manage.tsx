import React, { lazy, Fragment } from 'react'
import { WrapRoute } from 'components'
const SkuPriceManage = lazy(() => import('@/pages/Goods/SkuPriceManage'))
const SkuPriceEdit = lazy(() => import('@/pages/Goods/SkuPriceManage/SkuPriceEdit'))

export default [
  <WrapRoute path="/sku-price-manage" key="/sku-price-manage" component={SkuPriceManage} />,
  <WrapRoute path="/sku-price-edit" key="/sku-price-edit" component={SkuPriceEdit} />
]