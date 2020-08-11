import React from 'react'
import { Button, Modal, message } from 'antd'
// import history from '@/history'
import api from '@/api'

const actions = (getList?:() => void) => (text:any, record:any) => {
  if (record.status === 1) {
    return null
  }
  if (record.status === 2) {
    return (
      <div>
        <Button type="link" onClick={() => onBatch([record.skuCode], 3, getList!)}>上架</Button>
        {/* <Button type="link" onClick={() => history.push(`/spu-sku-list/${record.spuCode}`)}>SKU列表</Button> */}
      </div>
    )
  }
  if (record.status === 3) {
    return (
      <div>
        <Button type="link" onClick={() => onBatch([record.skuCode], 5, getList!)}>下架</Button>
      </div>
    )
  }
  if (record.status === 5) {
    return (
      <div>
        <Button type="link" onClick={() => onBatch([record.skuCode], 3, getList!)}>上架</Button>
        <Button type="link" onClick={() => onBatch([record.skuCode], 6, getList!)}>不再展示</Button>
      </div>
    )
  }
  return null
}

const map:any = {
  3: { text: '上架', fetch: api.sku.batchSkuOnSale },
  5: { text: '下架', fetch: api.sku.batchSkuDown },
  6: { text: '不再展示', fetch: api.sku.batchSkuOnShow }
}

const onBatch = (codes:any[], type:number, cb:() => void) => {
  const opt:any = map[type]
  Modal.confirm({
    title: opt.text,
    content: `确定要${opt.text}商品吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      await opt.fetch({ skuCodeList: codes })
      message.success(opt.text + '成功')
      cb && cb()
    }
  });
}

const pathKeyMap:any = {
  '/sku-manage': [1, 2, 3, 5, 6],
  '/sku-manage/perfecting': [1],
  '/sku-manage/perfected': [2],
  '/sku-manage/onsale': [3],
  '/sku-manage/unsale': [5],
  '/sku-manage/noshow': [6]
}

export { pathKeyMap, actions, onBatch }