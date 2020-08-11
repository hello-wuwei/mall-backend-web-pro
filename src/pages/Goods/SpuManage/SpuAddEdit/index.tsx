import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Radio, PageHeader, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { RouteComponentProps } from 'react-router-dom'
import { formItemLayout, formTailLayout } from '@/config'
import { GoFuzzySelect, GoFormItemUpload } from 'components'
import history from '@/history'
import SpuClassifySelect from './SpuClassifySelect'
import api from '@/api'

const SpuAddEdit = ({ location, form }:RouteComponentProps & FormComponentProps) => {
  const { getFieldDecorator } = form
  const spuCode = location.state.spuCode
  const look = location.state.look

  const [ spu, setSpu ] = useState<any>(null)
  const getSpu = async () => {
    const res = await api.spu.getSpu({ spuCode })
    setSpu(res.data)
  }

  useEffect(() => {
    spuCode && getSpu()
  }, [])

  const handleSubmit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.imageList = values.imageList.map((image:any) => ({ imageUrl: image.url, imageName: image.name }))
        values.imageDetailList = values.imageDetailList.map((image:any) => ({ imageUrl: image.url, imageName: image.name }))
        values.categoryCode = values.categoryCode[values.categoryCode.length - 1]
        if (spuCode) {
          values.spuCode = spuCode
          update(values)
        } else {
          add(values)
        }
      }
    })
  }

  const add = async (data:any) => {
    await api.spu.addSpu(data)
    message.success('新增成功')
    history.goBack()
  }

  const update = async (data:any) => {
    await api.spu.updateSpu(data)
    message.success('更新成功')
    history.goBack()
  }

  return (
    <div className='go-main-info-page'>
      <PageHeader style={{ padding: 0, paddingBottom: 30 }} title={spuCode ? look ? 'SPU基本信息' : '编辑SPU基本信息' : '添加SPU基本信息'} extra={[<Button key="0" onClick={() => history.goBack()}>返回</Button>]} />
      
      <div className="form">
        <Form {...formItemLayout}>
          <Form.Item label="SPU名称">
            {getFieldDecorator('spuName', {
              initialValue: spu ? spu.spuName : '',
              rules: [
                { required: true, message: '请输入SPU名称!' },
                { max: 50, message: '名称不能超过50个字符!' }
              ]
            })(
              <Input placeholder="请输入SPU名称" style={{ width: '40%' }} disabled={look} />,
            )}
          </Form.Item>
          <Form.Item label="SPU副标题">
            {getFieldDecorator('spuSubName', {
              initialValue: spu ? spu.spuSubName : '',
              rules: [
                { max: 50, message: '副标题不能超过50个字符!' }
              ]
            })(
              <Input placeholder="请输入SPU副标题" style={{ width: '40%' }}  disabled={look} />
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: spu ? spu.description : '',
              rules: [
                { max: 200, message: '描述不能超过200个字符!' }
              ]
            })(
              <Input.TextArea rows={4} placeholder="请输入描述" style={{ width: '40%' }}  disabled={look} />
            )}
          </Form.Item>
          <Form.Item label="商品品牌">
            {getFieldDecorator('brandCode', {
              initialValue: spu ? spu.brandCode : '',
              rules: [{ required: true, message: '请选择商品品牌!' }]
            })(
              <GoFuzzySelect enmuType="enmu_brands" all placeholder="请选择商品品牌" style={{ width: '40%' }} disabled={look} />
            )}
          </Form.Item>
          <Form.Item label="商品供应商" style={{ marginBottom: 0 }}>
            {getFieldDecorator('merchantCode', {
              initialValue: spu ? spu.merchantCode : '',
              rules: [{ required: true, message: '请选择供应商!' }]
            })(
              <GoFuzzySelect enmuType="enmu_suppliers" all placeholder="请选择供应商" style={{ width: '40%' }} disabled={look} />
            )}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            {getFieldDecorator('merchantDisplay', {
              valuePropName: 'checked',
              initialValue: spu ? spu.merchantDisplay : false
            })(
              <Checkbox disabled={look}>不显示店铺</Checkbox>
            )}
          </Form.Item>
          <Form.Item label="商品品类">
            {getFieldDecorator('categoryCode', {
              initialValue: spu ? [spu.categoryCode.slice(0, 4), spu.categoryCode.slice(0, 8), spu.categoryCode.slice(0, 12)] : '',
              rules: [{ required: true, message: '请选择商品品类' }]
            })(
              <SpuClassifySelect style={{ width: '40%' }} disabled={look} />
            )}
          </Form.Item>
          <Form.Item label="商品类型">
            {getFieldDecorator('categoryType', {
              initialValue: 0,
              rules: [{ required: true, message: '请选择商品类型!' }],
            })(
              <Radio.Group>
                <Radio value={0} disabled={look}>实物SPU（物流发货）</Radio>
                <Radio value={1} disabled>虚拟SPU（无需物流）</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <GoFormItemUpload label="商品主图" form={form} defaultConfig={{ defaultList: spu ? spu.imageList : []} } fieldName="imageList" disabled={look} />

          <GoFormItemUpload label="商品详情图" maxNumber={15} form={form} defaultConfig={{ defaultList: spu ? spu.imageDetailList : []} } fieldName="imageDetailList" disabled={look} />

          { !look ? <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={handleSubmit}>提交</Button>
          </Form.Item> : null }
        </Form>
      </div>
    </div>
  )
}

// const sp = {
//   'development': { lv1: 2, lv2: 4, lv3: 7}
// }[process.env.APP_ENV!] || 

const SpuAddEditForm = Form.create()(SpuAddEdit)

export default SpuAddEditForm