import React from 'react'
import { Button, Modal, message } from 'antd'
import history from '@/history'
import api from '@/api'

const actions = (text:any, record:any) => {
  if (record.status === 1) {    // 待完善
    return (
      <div>
        <Button type="link" onClick={() => history.push({ pathname: `/sku-price-edit`, state: { codes: [record.skuCode] } })}>录入</Button>
      </div>
    )
  }
  if (record.status === 2) {     // 已录入
    return (
      <div>
        <Button type="link" onClick={() => history.push({ pathname: `/sku-price-edit`, state: { codes: [record.skuCode] } })}>编辑</Button>
      </div>
    )
  }
  return null
}

const pathKeyMap:any = {
  '/sku-price-manage': [1, 2],
  '/sku-price-manage/perfecting': [1],
  '/sku-price-manage/perfected': [2]
}

export { pathKeyMap, actions }