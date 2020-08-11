import React, { useState, useEffect } from 'react'
import { Icon, Button, PageHeader, Modal, Input, message, Select } from 'antd'
import { ModalProps } from 'antd/es/modal'
import { GoTable, GoFuzzySearch } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import history from '@/history'
import api from '@/api'
import moment from 'moment'
import { enmu_sku_status } from '@/enmu'
import styles from './index.module.less'

const { SearchInput } = GoFuzzySearch

type TParams = { spuCode: string }

const SkuCreate = ({ match }:RouteComponentProps<TParams>) => {
  const spuCode = match.params.spuCode

  const [ skus, setSkus ] = useState<any[]>([])

  useEffect(() => {
    spuCode && getSpuSkuList()
  }, [])

  const getSpuSkuList = async () => {
    const res = await api.sku.getSpuSkuList({ spuCode, size: 9999 })
    setSkus(res.data.results)
  }

  const columns = [{
    title: '销售属性',
    dataIndex: 'propertyGroup'
  },
  {
    title: 'SKU-ID',
    dataIndex: 'skuCode'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (text:number) => enmu_sku_status.getName(text)
  },
  {
    title: '添加时间',
    dataIndex: 'created',
    render: (text:any) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  }
]
  

  const [ visible, setVisible ] = useState(false)
  return (
    <div className='go-main-info-page'>
      <AddSkuModal
        visible={visible}
        setVisible={setVisible}
        getSpuSkuList={getSpuSkuList}
        onCancel={() => setVisible(false)}
        title="添加SKU"
        width={700}
        spuCode={spuCode}
      />
      <PageHeader
        style={{ padding: 0, paddingBottom: 30 }}
        title={skus[0] ? skus[0].skuName : null}
        extra={[
          <Button key="0" type="primary" icon="plus" onClick={() => setVisible(true)}>添加SKU</Button>,
          <Button key="1" onClick={() => history.goBack()}>返回</Button>
        ]}
      />
      
      <div style={{ marginTop: 20 }}>
        <GoTable rowKey="skuCode" columns={columns} dataSource={skus} pagination={false} />
      </div>
    </div>
  )
}

type TP = {
  spuCode: string,
  setVisible: (value: boolean) => void,
  getSpuSkuList: () => void
}


const AddSkuModal = ({ spuCode, setVisible, getSpuSkuList, ...props }:ModalProps & TP) => {
  const [ list, setList ] = useState<any[]>([])
  useEffect(() => {
    getList()
  }, [])

  const getResetSku = (list:any[]) => {
    return list.map((option:any) => ({ propertyName: option.propertyName, propertyValue: '', spuCode }))
  }

  const getList = async () => {
    const res = await api.spu.addSkuTree({ spuCode })
    setList(res.data)
    setSku(getResetSku(res.data))
  }

  const [ sku, setSku ] = useState<any[]>([])

  const onSkuChange = (propertyName:any, propertyValue:any, index:number) => {
    let cloneSku = [...sku]
    const option = cloneSku.find(sku => sku.propertyName === propertyName)
    if (option) {
      option.propertyValue = propertyValue
    }
    setSku(cloneSku)
  }

  const onSubmit = async () => {
    if (sku.find((o:any) => !o.propertyValue)) {
      message.error('请完善sku')
      return
    }
    await api.spu.addSpuSku(sku)
    getSpuSkuList()
    setSku(getResetSku(list))
    setVisible(false)
  }

  return (
    <Modal onOk={onSubmit} {...props}>
      <div className={styles.modalStyle}>
        {
          list.length ? list.map((item:any, index:number) => {
            const currentSku = sku.find((o:any) => o.propertyName === item.propertyName)
            const value = currentSku ? currentSku.propertyValue : ''
            return (
              <div className="column" key={item.propertyName}>
                <h4>{item.propertyName}</h4>
                <div>属性值：
                  <WrapSearchInput
                    value={value}
                    style={{ width: '240px' }}
                    list={item.valueList}
                    onChange={(value:any) => onSkuChange(item.propertyName, value, index)}
                  />
                </div>
              </div>
            )
          }) : null
        }
      </div>
    </Modal>
  )
}

const WrapSearchInput = ({ list, ...props }:any) => {

  const fetch = (value:any, setOptions:any) => {
    let options = []
    const reg = new RegExp(value)
    if (value.length > 0) {
      for (let i = 0; i < list.length; i++) {
        const temp = list[i].propertyValue;
        if (temp.match(reg)) {
          options.push(list[i]);
        }
      }
      setOptions(options.map(option => option.propertyValue))
    }
  }
  
  return (
    <SearchInput fetch={fetch} allData={list.map((value:any) => value.propertyValue)} {...props} />
  )
}


export default SkuCreate