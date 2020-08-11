import React, { useEffect, useState } from 'react'
import { Input, Button, DatePicker } from 'antd'
import { Switch, RouteComponentProps } from 'react-router-dom'
// import {  } from 'mobx-react'
import { GoPageTop, GoFuzzySelect, WrapRoute, GoInput, GoTabBar } from 'components'
import history from '@/history'
import All from './All'
import Obligations from './Obligations'
import Paid from './Paid'
import Shipped from './Shipped'
import Completed from './Completed'
import Canceled from './Canceled'
import api from '@/api'
import moment from 'moment'
import { pathKeyMap, keyPathMap, columns } from './config'
import { useParams } from '@/custom-hooks'
import { clearEmptyValue } from '@/util'
import { enmu_order_status } from '@/enmu'
const { RangePicker } = DatePicker

const { Column } = GoPageTop

const OrderList = ({ match, location }:RouteComponentProps) => {
  const { params, setParams } = useParams(clearEmptyValue({ orderStatus: pathKeyMap[location.pathname] ? Number(pathKeyMap[location.pathname]) : '' }))

  const [ list, setList ] = useState([])
  const [ total, setTotal ] = useState(0)

  const getOrders = async () => {
    const res = await api.order.getOrders(params)
    setList(res.data.results)
    setTotal(res.data.total)
  }

  const onTabChange = (key:string) => {
    const status = key ? Number(key) : ''
    setParams({ orderStatus: status })
    history.push(keyPathMap[key])
  }

  const onReset = () => {
    setParams({
      orderCode: '',
      receiver: '',
      phone: '',
      merchantCode: '',
      userPhone: '',
      startTime: '',
      endTime: ''
    })
  }

  useEffect(() => {
    getOrders()
  }, [params.page, params.orderStatus, params.size])

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

  const setDateRange = (date:any) => {
    // console.log(date[0].startOf('minutes').valueOf())
    setParams({ startTime: date[0] ? date[0].startOf('minutes').valueOf() : '', endTime: date[1] ? date[1].startOf('minutes').valueOf() : '' })
  }
  
  return (
    <div>
      <div className="go-page-header">
        {/* <a download="file" src="http://olmysoft.img-cn-hangzhou.aliyuncs.com/file/bf6494d9-e9cd-4907-9992-853ecac924d5.jpg">download</a> */}
        <GoPageTop title="订单管理">
          <Column label="订单编号" style={{ width: "25%" }}>
            <GoInput mode="orderCode" value={params.orderCode} onChange={(e:any) => setParams({ orderCode: e.target.value })} placeholder="请输入订单编号" />
          </Column>
          <Column label="收货人" style={{ width: "25%" }}>
            <Input value={params.receiver} onChange={(e:any) => setParams({ receiver: e.target.value.trim() })} placeholder="请输入订单联系人姓名" />
          </Column>
          <Column label="联系电话" style={{ width: "25%" }}>
            <GoInput mode="mobile" value={params.phone} onChange={(e:any) => setParams({ phone: e.target.value })} placeholder="请输入联系人电话" />
          </Column>
          <Column label="供应商" style={{ width: "25%" }}>
            <GoFuzzySelect value={params.merchantCode} enmuType="enmu_suppliers" style={{ width: '100%' }} placeholder="请输入供应商" all onChange={(value:any) => setParams({ merchantCode: value })} />
          </Column>
          <Column label="下单用户" style={{ width: "30%" }}>
            <GoInput mode="mobile" value={params.userPhone} onChange={(e:any) => setParams({ userPhone: e.target.value })} placeholder="请输入下单人电话" />
          </Column>
          <Column label="下单日期">
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{ format: 'HH:mm' }}
              value={params.startTime ? [moment(params.startTime), moment(params.endTime)] : []}
              onChange={setDateRange}
            />
          </Column>
          <Column>
            <Button type="primary" icon="search" style={{ marginRight: 16 }} onClick={() => getOrders()}>查询</Button>
            <Button onClick={onReset}>重置</Button>
          </Column>
        </GoPageTop>
      </div>
      <div className="go-page-body">
        <GoTabBar defaultActiveKey={pathKeyMap[location.pathname]} onChange={onTabChange}>
          { [{ name: '全部', id: '' }, ...enmu_order_status.list].map(item => <GoTabBar.Item key={item.id.toString()} value={item.id.toString()}>{ item.name }</GoTabBar.Item>) }
        </GoTabBar>
        <div style={{ marginTop: 20 }}>
          <Switch>
            <WrapRoute exact path={match.url} component={() => <All rowKey="orderCode" columns={columns} dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/obligations`} component={() => <Obligations rowKey="orderCode" columns={columns} dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/paid`} component={() => <Paid rowKey="orderCode" columns={columns} dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/shipped`} component={() => <Shipped rowKey="orderCode" columns={columns} dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/completed`} component={() => <Completed rowKey="orderCode" columns={columns} dataSource={list} pagination={pagination} />} />
            <WrapRoute path={`${match.url}/canceled`} component={() => <Canceled rowKey="orderCode" columns={columns} dataSource={list} pagination={pagination} />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default OrderList