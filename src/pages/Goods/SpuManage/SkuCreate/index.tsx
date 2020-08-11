import React, { useState, useEffect } from 'react'
import { Icon, Button, PageHeader, Modal, Input, message, Select } from 'antd'
import { GoTable } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import history from '@/history'
import api from '@/api'
import { uniqueId } from 'lodash'

type TParams = { spuCode: string }

// const useGetSaleProperty = (spuCode:string, setGroups:any) => {
//   useEffect(() => {
//     spuCode && api.spu.getSpuSaleProperty({ spuCode }).then(res => {
//       setGroups(res.data)
//     })
//   }, [])
//   return null
// }

const useGetSkuAllList = (spuCode:string, setAllSku:any) => {
  useEffect(() => {
    spuCode && api.spu.getSkuAllList({ spuCode }).then(res => {
      res.data.forEach((item:any) => {
        item.rowId = uniqueId()
      })
      setAllSku(res.data)
    })
  }, [])
  return null
}

const SkuCreate = ({ match }:RouteComponentProps<TParams>) => {
  const spuCode = match.params.spuCode

//   const [ saleGroups, setSaleGroups ] = useState([])
  const [ allSku, setAllSku ] = useState([])
  useGetSkuAllList(spuCode, setAllSku)

//   useGetSaleProperty(spuCode, setSaleGroups)

  const handleSubmit = async () => {
    await api.spu.addSkuBatch(allSku)
    message.success('提交成功')
    history.go(-2)
  }

//   const [ groups, setGroups ] = useState<GroupIProps[]>([])

//   const addGroup = (group:GroupIProps) => {
//     setGroups([...groups, group])
//   }

//   const [ data, setData ] = useState<any[]>([])

//   const add = () => {
//     setData([...data, { rowId: data.length }])
//   }

//   const onSelectChange = (propertyName:string, value:any, index:number) => {

//   }

  const onDele = (item:any) => {
    const cloneAllSku = [...allSku]
    const index = cloneAllSku.findIndex(((option:any) => option.rowId === item.rowId))
    cloneAllSku.splice(index, 1)
    setAllSku(cloneAllSku)
  }

  const columns = [{
    title: '序号',
    width: 80,
    dataIndex: 'i',
    render: (text:any, record:any, index:number) => index + 1
  },
//   ...saleGroups.map((group:any) => {
//     return ({
//       title: group.propertyName,
//       dataIndex: group.propertyName,
//       render: (text:any, record:any, index:number) => {
//         return (
//           <Select style={{ width: '80%' }} onChange={(value) => onSelectChange(group.propertyName, value, index)}>
//             { group.valueList.map((option:any, index:number) => (
//               <Select.Option value={option.propertyValue} key={index}>{option.propertyValue}</Select.Option>) 
//             )}
//           </Select>
//         )
//       }
//     })
//   }),
  {
    title: 'SKU',
    dataIndex: 'sku',
    render: (text:any, record:any) => { return record.skuPropertyDTOList.map((item:any) => item.propertyValue).join('+') }
  },
  {
    title: '操作',
    width: 100,
    dataIndex: 'action',
    render: (text:any, record:any) => <Button type="link" onClick={() => onDele(record)}>删除</Button>
  }]
  

  return (
    <div className='go-main-info-page'>

      <PageHeader style={{ padding: 0, paddingBottom: 30 }} title="生成SKU" extra={[<Button key="0" onClick={() => history.goBack()}>返回</Button>]} />
      {/* <div>
        <Button type="primary" icon="plus" onClick={add}>添加一个项</Button>
      </div> */}
      
      <div style={{ marginTop: 20 }}>
        <GoTable rowKey="rowId" columns={columns} dataSource={allSku} pagination={false} />
      </div>

      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <Button type="primary" style={{ marginRight: 40 }} onClick={() => history.goBack()}>上一步</Button>
        <Button onClick={() => handleSubmit()}>提交</Button>
      </div>
    </div>
  )
}


export default SkuCreate