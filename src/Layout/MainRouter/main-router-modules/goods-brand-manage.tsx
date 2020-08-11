import React, { lazy } from 'react'
import { WrapRoute } from 'components'
const BrandManage = lazy(() => import('@/pages/Goods/BrandManage'))
const AddOrEditBrand = lazy(() => import('@/pages/Goods/BrandManage/AddOrEditBrand'))

export default [
  <WrapRoute path="/brand-manage" key="/brand-manage" component={BrandManage} />,
  <WrapRoute path="/brand-add-edit" key="/brand-add-edit" component={AddOrEditBrand} />
]