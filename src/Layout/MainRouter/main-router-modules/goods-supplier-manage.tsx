import React, { lazy } from 'react'
import { WrapRoute } from 'components'
const SupplierManage = lazy(() => import('@/pages/Goods/SupplierManage'))
const AddOrEditSupplier = lazy(() => import('@/pages/Goods/SupplierManage/AddOrEditSupplier'))

export default [
  <WrapRoute path="/supplier-manage" key="/supplier-manage" component={SupplierManage} />,
  <WrapRoute path="/supplier-add-edit" key="/supplier-add-edit" component={AddOrEditSupplier} />
]