import React, { useEffect, useState } from 'react'
import { GoPageTop } from 'components'
import { Button } from 'antd'
import ClassifyDrapTree from './ClassifyDrapTree'
import api from '@/api'
import RatioModal from './RatioModal'
import history from '@/history'

const ClassifyManage = () => {
  const [ data, setData ] = useState([])
  const getClassifyData = async () => {
    const res = await api.classify.getClassifyData()
    setData(res.data)
  }
  useEffect(() => {
    getClassifyData()
  }, [])

  const [ visible, setVisible ] = useState(false)
  const [ category, setCategory ] = useState(null)

  const onHandle = (item:any) => {
    setCategory(item)
    setVisible(true)
  }

  const onClassify = (currentCategory:any = {}, type:string, parentCategory:object = {}) => {
    history.push({ pathname: '/classify/add-edit', state: { isUpdate: type === 'update', parentCategory, currentCategory } })
  }

  return (
    <div>
      <RatioModal category={category} visible={visible} setVisible={setVisible} getClassifyData={getClassifyData} />
      <div className="go-page-header">
        <GoPageTop title="商品品类" actions={<Button type="primary" onClick={() => onClassify({ categoryLevel: 0 }, 'create', {})}>添加一级分类</Button>} />
      </div>
      <div className="go-page-body" style={{ paddingTop: 0 }}>
        { data && data.length ? <ClassifyDrapTree data={data} onHandle={onHandle} onClassify={onClassify} /> : null }
      </div>
    </div>
  )
}

export default ClassifyManage