import React, { lazy, Fragment } from 'react'
import { WrapRoute } from 'components'
const ClassifyManage = lazy(() => import('@/pages/Goods/ClassifyManage'))
const ClassifyAddEdit = lazy(() => import('@/pages/Goods/ClassifyManage/ClassifyAddEdit'))

export default [
  <WrapRoute path="/classify-manage" key="/classify-manage" component={ClassifyManage} />,
  <WrapRoute path="/classify/add-edit" key="/classify/add-edit" component={ClassifyAddEdit} />
]