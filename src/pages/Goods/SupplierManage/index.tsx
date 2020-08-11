import React, { useEffect, useState } from 'react'
import { Button, Icon, Modal, message } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
// import {  } from 'mobx-react'
import { GoPageTop, GoFuzzySelect, GoTable } from 'components'
import history from '@/history'
import api from '@/api'
import moment from 'moment'
import { useParams } from '@/custom-hooks'
import { clearEmptyValue } from '@/util'
import styles from './index.module.less'

const SupplierManage = ({ match, location }:RouteComponentProps) => {
  const { params, setParams } = useParams(clearEmptyValue({ merchantCode: '' }))

  const [ list, setList ] = useState([])
  const [ total, setTotal ] = useState(0)

  const getPageSuppliers = async () => {
    const res = await api.supplier.getPageSuppliers(params)
    setList(res.data.results)
    setTotal(res.data.total)
  }

  useEffect(() => {
    getPageSuppliers()
  }, [params.page, params.size])

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

  // rowSelection object indicates the need for row selection
  const [ codeList, setCodeList ] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys:any) => {
      setCodeList(selectedRowKeys)
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  const onDelete = (codeArray:string[]) => {
    Modal.confirm({
      title: '删除',
      content: '确定要删除供应商吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        api.supplier.deleBatchSupplier(codeArray).then((res:any) => {
          if (res.code === 0) {
            message.success('删除成功')
            getPageSuppliers()
          }
        })
      }
    })
  }

  const onBatchChangeStatus = (status:boolean) => {
    const text = status ? '开启' : '关闭'
    Modal.confirm({
      title: `批量${text}`,
      content: `确定要${text}选中的供应商吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        api.supplier.updateSupplierStatus({ merchantCodeList: codeList, displayFlag: status }).then((res:any) => {
          if (res.code === 0) {
            message.success(text + '成功')
            setCodeList([])
            getPageSuppliers()
          }
        })
      }
    });
  }

  const onAddOrEdit = (option:any) => {
    history.push({ pathname: '/supplier-add-edit', state: { merchantCode: option ? option.merchantCode : null } })
  }

  const columns = [
    { title: '供应商名称', dataIndex: 'merchantName' },
    { title: '描述', dataIndex: 'description' },
    { title: '状态', dataIndex: 'displayFlag', render: (text:boolean) => text ? '开启' : '关闭' },
    { title: '添加时间', dataIndex: 'createTime', render: (text:any) => moment(text).format('YYYY-MM-DD HH:mm:ss') },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text:any, record:any) => {
        return (
          <div>
            {/* <Button type="link" onClick={() => onDelete([record.merchantCode])}>删除</Button> */}
            <Button type="link" onClick={() => onAddOrEdit(record)}>编辑</Button>
          </div>
        )
      }
    }
  ]
  
  return (
    <div>
      <div className="go-page-header">
        <GoPageTop title="供应商管理" actions={
          <div style={{ position: 'relative' }}>
            <GoFuzzySelect placeholder="请输入供应商名称" style={{ width: 400 }} all allowClear={false} enmuType="enmu_suppliers"
              onChange={(value) => { setParams({ merchantCode: value })}}
            />
            <span onClick={getPageSuppliers} style={{ position: 'absolute', right: 2, top: 2, padding: '1px 5px', background: '#fff', cursor: 'pointer' }}>
              <Icon type="search" />
            </span>
          </div>
          }
        />
      </div>
      <div className="go-page-body">
        <div className={styles.content}>
          <div className="actions">
            <Button type="primary" icon="plus" style={{ marginRight: 15 }} onClick={onAddOrEdit}>添加供应商</Button>
            {/* <Button style={{ marginRight: 15 }} onClick={() => onDelete(codeList)} disabled={!codeList.length}>批量删除</Button> */}
            <Button style={{ marginRight: 15 }} onClick={() => onBatchChangeStatus(false)} disabled={!codeList.length}>批量关闭</Button>
            <Button onClick={() => onBatchChangeStatus(true)} disabled={!codeList.length}>批量开启</Button>
          </div>
          <div className="select-count">
            <Icon type="info-circle" theme="filled" style={{ color: '#0E77D1', marginRight: 15 }} />
            已选择<i style={{ color: '#1890FF', margin: '0 3px' }}>{codeList.length}</i>项
          </div>
          <div className="table">
            <GoTable rowKey="merchantCode" rowSelection={rowSelection} columns={columns} dataSource={list} pagination={pagination} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierManage