import React, { useState, useEffect } from 'react'
import { Input, Button, Tabs } from 'antd'
import { Switch, RouteComponentProps } from 'react-router-dom'
import { GoPageTop, WrapRoute, GoTabBar, GoFuzzySelect } from 'components'
import { useParams } from '@/custom-hooks'
import { clearEmptyValue } from '@/util'
import history from '@/history'
import All from './All'
import Perfecting from './Perfecting'
import Perfected from './Perfected'
import OnSale from './OnSale'
import UnSale from './UnSale'
import { pathKeyMap } from './config'
import api from '@/api'

const { Column } = GoPageTop

const ClassifyManage = ({ match, location }:RouteComponentProps) => {
  const { params, setParams } = useParams(clearEmptyValue({ status: pathKeyMap[location.pathname] ? Number(pathKeyMap[location.pathname]) : '' }))

  const onGoodsChange = (key:string) => {
    setParams({ status: pathKeyMap[key] ? Number(pathKeyMap[key]) : '' })
    history.push(key)
  }

  const [ list, setList ] = useState([])
  const [ total, setTotal ] = useState(0)

  useEffect(() => {
  }, [])

  const onReset = () => {
    setParams({
      brandCode: '',
      categoryCode: '',
      spuName: ''
    })
  }

  const getSpus = async () => {
    const res = await api.spu.getSpus(params)
    setList(res.data.results)
    setTotal(res.data.total)
  }

  useEffect(() => {
    getSpus()
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

  const onAdd = () => {
    history.push({ pathname: '/spu-add-edit', state: { spuCode: null } })
  }

  return (
    <div>
      <div className="go-page-header">
        <GoPageTop title="商品管理">
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
              placeholder="请选择商品品类"
              all
              onChange={(value:any) => setParams({ brandCode: value })}
            />
          </Column>
          <Column label="SPU名称" style={{ width: "25%" }}>
            <Input value={params.spuName} onChange={(e:any) => setParams({ spuName: e.target.value.trim() })} placeholder="请输入SPU名称" />
          </Column>
          <Column>
            <Button type="primary" icon="search" style={{ marginRight: 16 }} onClick={() => getSpus()}>查询</Button>
            <Button onClick={onReset}>重置</Button>
          </Column>
          <Column>
            <Button type="primary" icon="plus" style={{ marginRight: 16 }} onClick={onAdd}>添加SPU</Button>
            {/* <Button type="primary">从外部导入</Button> */}
          </Column>
        </GoPageTop>
      </div>
      <div className="go-page-body">
        <GoTabBar defaultActiveKey={location.pathname} onChange={onGoodsChange}>
          <GoTabBar.Item key={`${match.url}`} value={`${match.url}`}>全部</GoTabBar.Item>
          <GoTabBar.Item key={`${match.url}/perfecting`} value={`${match.url}/perfecting`}>待完善</GoTabBar.Item>
          <GoTabBar.Item key={`${match.url}/perfected`} value={`${match.url}/perfected`}>已完善</GoTabBar.Item>
          <GoTabBar.Item key={`${match.url}/onsale`} value={`${match.url}/onsale`}>已上架</GoTabBar.Item>
          <GoTabBar.Item key={`${match.url}/unsale`} value={`${match.url}/unsale`}>已下架</GoTabBar.Item>
        </GoTabBar>
        <div style={{ marginTop: 20 }}>
          <Switch>
            <WrapRoute exact path={match.url} component={() => <All getList={getSpus} rowKey="spuCode" dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/perfecting`} component={() => <Perfecting rowKey="spuCode" dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/perfected`} component={() => <Perfected getList={getSpus} rowKey="spuCode" dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/onsale`} component={() => <OnSale getList={getSpus} rowKey="spuCode" dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/unsale`} component={() => <UnSale getList={getSpus} rowKey="spuCode" dataSource={list} pagination={pagination} />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default ClassifyManage