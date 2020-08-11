import React from 'react'
import { Button, Modal, message } from 'antd'
import history from '@/history'
import api from '@/api'

const actions = (getList?:() => void) => (text:any, record:any) => {
  if (record.status === 1) {
    return (
      <div>
        <Button type="link" onClick={() => history.push(`/spu-property-add/${record.spuCode}`)}>添加属性</Button>
        <Button type="link" onClick={() => history.push({ pathname: '/spu-add-edit', state: { spuCode: record.spuCode } })}>编辑</Button>
      </div>
    )
  }
  if (record.status === 2) {
    return (
      <div>
        <Button type="link" onClick={() => onBatchSale([record.spuCode], 3, getList!)}>上架</Button>
        <Button type="link" onClick={() => history.push({ pathname: '/spu-add-edit', state: { spuCode: record.spuCode } })}>编辑</Button>
        <Button type="link" onClick={() => history.push(`/spu-sku-list/${record.spuCode}`)}>SKU列表</Button>
      </div>
    )
  }
  if (record.status === 3) {
    return (
      <div>
        <Button type="link" onClick={() => onBatchSale([record.spuCode], 4, getList!)}>下架</Button>
        <Button type="link" onClick={() => history.push({ pathname: '/spu-add-edit', state: { spuCode: record.spuCode, look: true } })}>查看详情</Button>
        <Button type="link" onClick={() => history.push(`/spu-sku-list/${record.spuCode}`)}>SKU列表</Button>
      </div>
    )
  }
  if (record.status === 4) {
    return (
      <div>
        <Button type="link" onClick={() => onBatchSale([record.spuCode], 3, getList!)}>上架</Button>
        <Button type="link" onClick={() => history.push({ pathname: '/spu-add-edit', state: { spuCode: record.spuCode, look: true } })}>查看详情</Button>
        <Button type="link" onClick={() => history.push(`/spu-sku-list/${record.spuCode}`)}>SKU列表</Button>
      </div>
    )
  }
  return null
}

const onBatchSale = (codes:any[], type:number, cb:() => void) => {
  const text = type === 3 ? '上架' : '下架'
  Modal.confirm({
    title: text,
    content: `确定要${text}商品吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      await api.spu.onBatchSale({ spuCodeList: codes, type })
      message.success(text + '成功')
      cb && cb()
    }
  });
}

const pathKeyMap:any = {
  '/spu-manage': '',
  '/spu-manage/perfecting': '1',
  '/spu-manage/perfected': '2',
  '/spu-manage/onsale': '3',
  '/spu-manage/unsale': '4'
}

export { pathKeyMap, actions, onBatchSale }