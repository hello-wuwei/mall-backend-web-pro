import React, { useState, useEffect } from 'react'
import { Icon, Button, PageHeader, Modal, Input, message, Empty } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import {  } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import history from '@/history'
import TagGroup from './TagGroup'
import api from '@/api'

type GroupIProps = {
  propertyName: string,
  valueList: object[],
  spuCode: string
}

type TParams = { spuCode: string }

const useGetSaleProperty = (spuCode:string, setGroups:any) => {
  useEffect(() => {
    spuCode && api.spu.getSpuSaleProperty({ spuCode }).then(res => {
      setGroups(res.data)
    })
  }, [])
  return null
}

const SpuPropertyAdd = ({ match }:RouteComponentProps<TParams>) => {
  const spuCode = match.params.spuCode

  const [ groups, setGroups ] = useState<GroupIProps[]>([])

  useGetSaleProperty(spuCode, setGroups)

  const handleSubmit = async (action:string) => {
    if (!groups.length) {
      message.error('请添加销售属性')
      return
    }
    const group = groups.find(group => group.valueList.length === 0)
    console.log(groups)
    if (group) {
      message.error(group.propertyName + '属性组请至少添加一个属性值')
      return
    }
    await api.spu.addSpuSaleProperty(groups)
    if (action === 'save') {
      message.success('添加成功')
      history.goBack()
    } else {
      history.push(`/sku-create/${spuCode}`)
    }
  }

  const addGroup = (group:GroupIProps) => {
    setGroups([...groups, group])
  }

  const showConfirm = () => {
    if (groups.length >= 3) {
      message.error('添加失败，最多只能添加3个属性组')
      return
    }
    let groupName = ''
    Modal.confirm({
      title: '添加属性组',
      className: 'go-confirm-input',
      icon: <Icon type="info-circle" style={{ color: '#1890ff' }} />,
      content: <Input onChange={(e) => groupName = e.target.value.trim()} />,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        if (groupName) {
          addGroup({ propertyName: groupName, valueList: [], spuCode })
        } else {
          message.error('请输入属性组名称')
          return Promise.reject('错误')
        }
      }
    })
  }

  const onGroupChange = (groupName:string, values:string[]) => {
    const cloneGroups = [...groups]
    const group = cloneGroups.find(group => group.propertyName === groupName)
    if (group) {
      group.valueList = values.map(value => ({ propertyName: groupName, propertyValue: value, spuCode }))
    }
    setGroups(cloneGroups)
  }

  const onDeleteGroup = ({ propertyName, valueList }:any) => {
    const dele = () => {
      const cloneGroups = [...groups]
      const groupIndex = cloneGroups.findIndex(group => group.propertyName === propertyName)
      if (groupIndex > -1) {
        cloneGroups.splice(groupIndex, 1)
      }
      setGroups(cloneGroups)
    }
    if (valueList.length) {
      Modal.confirm({
        title: '删除属性组',
        content: '该组存在属性值，确定要删除该属性组吗？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          dele()
        }
      })
    } else {
      dele()
    }
  }
  

  return (
    <div className='go-main-info-page'>

      <PageHeader style={{ padding: 0, paddingBottom: 30 }} title="添加SPU销售属性" extra={[<Button key="0" onClick={() => history.goBack()}>返回</Button>]} />
      <div>
        <Button type="primary" icon="plus" onClick={showConfirm}>添加销售属性</Button>
      </div>
      
      <div style={{ marginTop: 20 }}>
        {
          groups.length ? groups.map(group => (
            <PropertyGroup
              key={group.propertyName}
              name={group.propertyName}
              tags={group.valueList}
              onChange={(values) => onGroupChange(group.propertyName, values)}
              onDeleteGroup={() => onDeleteGroup(group)} />
            )) : <Empty />
        }
      </div>

      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <Button type="primary" style={{ marginRight: 40 }} onClick={() => handleSubmit('save')}>保存</Button>
        <Button onClick={() => handleSubmit('next')}>下一步</Button>
      </div>
    </div>
  )
}

type PropertyGroupIProps = {
  name: string,
  tags?: any[],
  onChange: (value:string[]) => void,
  onDeleteGroup: () => void
}

const PropertyGroup = ({ name = '属性名', tags  = [], onChange, onDeleteGroup }:PropertyGroupIProps) => {
  return (
    <div style={{ marginBottom: 25 }}>
      <div className="group-name" style={{ lineHeight: '40px', background: '#f8f8f8', padding: '0 15px', marginBottom: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4>属性名：{ name }</h4>
        <Icon type="close-circle" style={{ fontSize: 20, cursor: 'pointer', color: '#bfbfbf' }} theme="filled" onClick={onDeleteGroup} />
      </div>
      <div className="group-value-list">
        <TagGroup tags={tags.map(tag => tag.propertyValue)} onChange={onChange} />
      </div>
    </div>
  )
}


export default SpuPropertyAdd