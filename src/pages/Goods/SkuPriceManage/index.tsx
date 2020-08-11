import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { Switch, RouteComponentProps } from 'react-router-dom'
import { GoPageTop, WrapRoute, GoTabBar, GoFuzzySelect } from 'components'
import { useParams } from '@/custom-hooks'
import { clearEmptyValue } from '@/util'
import history from '@/history'
import All from './All'
import Perfecting from './Perfecting'
import Perfected from './Perfected'
import { pathKeyMap } from './config'
import api from '@/api'

const { Column } = GoPageTop

const SkuManage = ({ match, location }:RouteComponentProps) => {
  const { params, setParams } = useParams(clearEmptyValue({ status: pathKeyMap[location.pathname] }))

  const onGoodsChange = (key:string) => {
    setParams({ status: pathKeyMap[key] })
    history.push(key)
  }

  const [ list, setList ] = useState([])
  const [ total, setTotal ] = useState(0)

  const onReset = () => {
    setParams({
      brandCode: '',
      categoryCode: '',
      spuName: '',
      skuCode: '',
      skuName: ''
    })
  }

  const getSkus = async () => {
    const res = await api.sku.getSpuSkuList(params)
    setList(res.data.results)
    setTotal(res.data.total)
  }

  useEffect(() => {
    getSkus()
  }, [params.page, params.status, params.size])

  const pagination = {
    total,
    current: params.page,
    pageSize: params.size,
    onChange: (page:number) => setParams({ page }),
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (current:number, size:number) => setParams({ size }),
    showTotal: (total:number) => <span>{`共 ${total} 条记录 第${params.page} / ${Math.ceil(total/params.size)}页`}</span>
  }

  return (
    <div>
      <div className="go-page-header">
        <GoPageTop title="价格管理">
          <Column label="商品品类" style={{ width: "25%" }}>
            <GoFuzzySelect
              value={params.categoryCode}
              enmuType="enmu_classifies"
              style={{ width: '100%' }}
              placeholder="请选择商品品类"
              all
              onChange={(value:any) => setParams({ categoryCode: value })}
            />
          </Column>
          <Column label="商品品牌" style={{ width: "25%" }}>
            <GoFuzzySelect
              value={params.brandCode}
              enmuType="enmu_brands"
              style={{ width: '100%' }}
              placeholder="请选择商品品牌"
              all
              onChange={(value:any) => setParams({ brandCode: value })}
            />
          </Column>
          <Column label="商品ID" style={{ width: "25%" }}>
            <Input value={params.skuCode} onChange={(e:any) => setParams({ skuCode: e.target.value.trim() })} placeholder="请输入商品ID" />
          </Column>
          <Column label="商品名称" style={{ width: "25%" }}>
            <Input value={params.skuName} onChange={(e:any) => setParams({ skuName: e.target.value.trim() })} placeholder="请输入商品名称" />
          </Column>
          <Column>
            <Button type="primary" icon="search" style={{ marginRight: 16 }} onClick={() => getSkus()}>查询</Button>
            <Button onClick={onReset}>重置</Button>
          </Column>
        </GoPageTop>
      </div>
      <div className="go-page-body">
        <GoTabBar defaultActiveKey={location.pathname} onChange={onGoodsChange}>
          <GoTabBar.Item key={`${match.url}`} value={`${match.url}`}>全部</GoTabBar.Item>
          <GoTabBar.Item key={`${match.url}/perfecting`} value={`${match.url}/perfecting`}>待完善</GoTabBar.Item>
          <GoTabBar.Item key={`${match.url}/perfected`} value={`${match.url}/perfected`}>价格管理</GoTabBar.Item>
        </GoTabBar>
        <div style={{ marginTop: 20 }}>
          <Switch>
            <WrapRoute exact path={match.url} component={() => <All getList={getSkus} rowKey="skuCode" dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/perfecting`} component={() => <Perfecting rowKey="skuCode" dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/perfected`} component={() => <Perfected getList={getSkus} rowKey="skuCode" dataSource={list} pagination={pagination} />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default SkuManage