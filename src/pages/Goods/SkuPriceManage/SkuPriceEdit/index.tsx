import React, { useState, useEffect } from 'react'
import { Button, PageHeader, message } from 'antd'
import { GoTable, GoNumberInput } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import history from '@/history'
import api from '@/api'

type ModelProps = {
  originalPrice: number,
  purchasePrice: number,
  skuCode: string
}

const SkuPriceEdit = ({ location }:RouteComponentProps) => {
  const codes = location.state.codes

  const [ skus, setSkus ] = useState<any[]>([])

  useEffect(() => {
    getSkuListInfo()
  }, [])

  const getSkuListInfo = async () => {
    const res = await api.sku.getSkuListInfo({ skuCodeList: codes })
    setSkus(res.data)
    const initData = res.data.map(({ originalPrice, purchasePrice, skuCode, price, score }:any) => ({
      originalPrice, purchasePrice, skuCode, price, score
    }))
    setData(initData)
  }

  // 价格预估
  const toComputed = async (params:ModelProps) => {
    const res = await api.sku.getSkuSaleEstimate(params)
    const { price, score } = res.data
    return { price, score }
  }

  const [ data, setData ] = useState<any[]>([])
  const onAutoCreate = async ({ skuCode }:any) => {
    let cloneData = [...data]
    const findedItem = cloneData.find(item => item.skuCode === skuCode)
    const { purchasePrice, originalPrice } = findedItem

    if (!purchasePrice) {
      message.error('请输入采购价')
      return
    }
    if (!originalPrice) {
      message.error('请输入市场建议价')
      return
    }
    const { price, score } = await toComputed({ purchasePrice, originalPrice, skuCode })
    
    if (findedItem) {
      findedItem.price = price || '0'
      findedItem.score = score || '0'
      findedItem.purchasePrice = purchasePrice
      findedItem.originalPrice = originalPrice
    } else {
      cloneData.push({
        skuCode,
        price,
        score,
        purchasePrice,
        originalPrice
      })
    }
    setData(cloneData)
  }

  const onChangeHandle = (skuCode:any, value:any, field:string) => {
      
    const cloneData = [...data]
    const findedItem = cloneData.find(o => o.skuCode === skuCode)
    findedItem[field] = value
    setData(cloneData)
  }

  const batchSkuSetting = async () => {
    const findedItem = data.find(item => !item.price || !item.score || item.purchasePrice === '' || item.originalPrice === '' )
    if (findedItem) {
      message.error('请完善销价格与赠送天数')
      return
    }
    const subData = data.map(option => {
      for (let key in option) {
        if (key !== 'skuCode') {
          option[key] = Number(option[key])
        }
      }
      return option
    })
    // console.log(subData)
    await api.sku.batchSkuSetting({ settingList: subData })
    message.success('提交成功')
    history.goBack()
  }

  const getOption = (data:any[], skuCode:string) => {
    return data.find(o => o.skuCode === skuCode)
  }

  const getValue = (data:any[], skuCode:string, field:string) => {
    const option = getOption(data, skuCode)
    return option ? option[field] ? option[field].toString() : '' : ''
  }
  
  const columns = [{
    title: '商品名称',
    dataIndex: 'skuName'
  },
  {
    title: '销售属性',
    dataIndex: 'propertyGroup'
  },
  {
    title: '品牌',
    dataIndex: 'brandName'
  },
  {
    title: '类别',
    dataIndex: 'categoryName'
  },
  {
    title: '采购价（元）',
    dataIndex: 'purchasePrice',
    render: (text:any, record:any) => (
      <GoNumberInput
        value={getValue(data, record.skuCode, 'purchasePrice')}
        onChange={(value:any) => onChangeHandle(record.skuCode, value, 'purchasePrice')}
        style={{ width: 100 }}
      />
    )
  },
  {
    title: '市场建议价（元）',
    dataIndex: 'originalPrice',
    render: (text:any, record:any) => (
      <GoNumberInput
        value={getValue(data, record.skuCode, 'originalPrice')}
        onChange={(value:any) => onChangeHandle(record.skuCode, value, 'originalPrice')}
        style={{ width: 100 }}
      />
    )
  },
  {
    title: '销售价（元）',
    dataIndex: 'price',
    render: (text:any, record:any) => (
      <GoNumberInput
        value={getValue(data, record.skuCode, 'price') || ''}
        onChange={(value:any) => onChangeHandle(record.skuCode, value, 'price')}
        style={{ width: 100 }}
      />
    )
  },
  {
    title: '赠送天数（天）',
    dataIndex: 'score',
    render: (text:any, record:any) => (
      <GoNumberInput
        value={getValue(data, record.skuCode, 'score') || ''}
        onChange={(value:any) => onChangeHandle(record.skuCode, value, 'score')}
        style={{ width: 100 }}
      />
    )  
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: (text:any, record:any) => <Button type="link" onClick={() => onAutoCreate(record)}>生成销售价</Button>
  }
]
  
  return (
    <div className='go-main-info-page'>
      <PageHeader
        style={{ padding: 0, paddingBottom: 30 }}
        title="价格维护"
        extra={[
          <Button key="1" onClick={() => history.goBack()}>返回</Button>
        ]}
      />
      
      <div style={{ marginTop: 20 }}>
        <GoTable bordered rowKey="skuCode" columns={columns} dataSource={skus} pagination={false} />
      </div>
      <div style={{ marginTop: 50, textAlign: 'center' }}>
        <Button onClick={() => history.goBack()} style={{ marginRight: 15 }}>取消</Button>
        <Button type="primary" onClick={batchSkuSetting}>提交</Button>
      </div>
    </div>
  )
}


export default SkuPriceEdit