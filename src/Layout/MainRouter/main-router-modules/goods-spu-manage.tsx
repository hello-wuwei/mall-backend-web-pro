import React, { lazy, Fragment } from 'react'
import { WrapRoute } from 'components'
const SpuManage = lazy(() => import('@/pages/Goods/SpuManage'))
const SpuAddEdit = lazy(() => import('@/pages/Goods/SpuManage/SpuAddEdit'))
const SpuPropertyAdd = lazy(() => import('@/pages/Goods/SpuManage/SpuPropertyAdd'))
const SkuCreate = lazy(() => import('@/pages/Goods/SpuManage/SkuCreate'))
const SpuSkuList = lazy(() => import('@/pages/Goods/SpuManage/SpuSkuList'))

export default [
  <WrapRoute path="/spu-manage" key="/spu-manage" component={SpuManage} />,
  <WrapRoute path="/spu-add-edit" key="/spu-add-edit" component={SpuAddEdit} />,
  <WrapRoute path="/spu-property-add/:spuCode" key="/spu-property-add/:spuCode" component={SpuPropertyAdd} />,
  <WrapRoute path="/sku-create/:spuCode" key="/sku-create/:spuCode" component={SkuCreate} />,
  <WrapRoute path="/spu-sku-list/:spuCode" key="/spu-sku-list/:spuCode" component={SpuSkuList} />
]