import React, { useState, useEffect, forwardRef } from 'react'
import { Form, Input, Button, Upload, Switch, PageHeader, Slider, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { RouteComponentProps } from 'react-router-dom'
import { formItemLayout, formTailLayout } from '@/config'
import { GoFormItemSingleUpload } from 'components'
import history from '@/history'
import api from '@/api'

const ClassifyAddEdit = ({ location, form }:RouteComponentProps & FormComponentProps) => {
  const { getFieldDecorator } = form

  const { isUpdate, parentCategory, currentCategory } = location.state  // currentCategory不用做回显，另调接口回显


  const { categoryCode } = currentCategory

  // console.log(currentCategory)

  const [ category, setCategory ] = useState<any>(null)
  const getCategory = async () => {
    const res = await api.classify.getCategory({ categoryCode })
    setCategory(res.data)
  }

  useEffect(() => {
    isUpdate && getCategory()
  }, [])

  const handleSubmit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.categoryImage = values.categoryImages && values.categoryImages[0] ? values.categoryImages[0].url : undefined
        values.background = values.backgrounds && values.backgrounds[0] ? values.backgrounds[0].url : undefined
        delete values.categoryImages
        delete values.backgrounds
        // values.categoryLevel = currentCategory.level
        
        // return
        if (values.discount) {
          values.discount = values.discount,
          values.present = 100 - values.discount
        }
        if (isUpdate) {
          values.categoryCode = currentCategory.categoryCode
          values.parentCode = parentCategory.categoryCode
          values.categoryLevel = currentCategory.categoryLevel
          update(values)
        } else {
          values.parentCode = currentCategory.categoryCode
          values.categoryLevel = currentCategory.categoryLevel + 1
          add(values)
        }
        
      }
    })
  }

  const add = async (data:any) => {
    await api.classify.addCategory(data)
    message.success('新增成功')
    history.goBack()
  }

  const update = async (data:any) => {
    await api.classify.editCategory(data)
    message.success('更新成功')
    history.goBack()
  }

  return (
    <div className='go-main-info-page'>
      <PageHeader style={{ padding: 0, paddingBottom: 30 }} title={isUpdate ? '编辑品类' : '添加品类'} extra={[<Button key="0" onClick={() => history.goBack()}>返回</Button>]} />
      
      <div className="form">
        <Form {...formItemLayout}>
          <Form.Item label="分类名称">
            {getFieldDecorator('categoryName', {
              initialValue: category ? category.categoryName : '',
              rules: [
                { required: true, message: '请输入分类名称!' },
                { max: 16, message: '名称不能超过16个字符!' }
              ]
            })(
              <Input placeholder="请输入分类名称" style={{ width: '40%' }} />,
            )}
          </Form.Item>
          { (!isUpdate && currentCategory.categoryLevel > 0) || (isUpdate && currentCategory.categoryLevel > 1) ?
            <Form.Item label="上级分类">
              <Input placeholder="请输入上级分类" defaultValue={isUpdate ? parentCategory.categoryName : currentCategory.categoryName} style={{ width: '40%' }} disabled />
            </Form.Item> : null
          }
          {/* <Form.Item label="分类排序">
            {getFieldDecorator('description', {
              initialValue: spu ? spu.description : '',
              rules: [
                { max: 200, message: '分类排序不能超过200个字符!' }
              ]
            })(
              <Input.TextArea rows={4} placeholder="请输入描述" style={{ width: '40%' }}  disabled={look} />
            )}
          </Form.Item> */}
          <Form.Item label="是否显示">
            {getFieldDecorator('displayFlag', {
              valuePropName: 'checked',
              initialValue: category ? category.displayFlag : true
            })(
              <Switch />
            )}
          </Form.Item>
          <GoFormItemSingleUpload
            label="品类LOGO"
            form={form}
            defaultConfig={{ defaultList: category ? [{ uid: '-1', imageUrl: category.categoryImage, name: 'img', status: 'done'}] : []} }
            fieldName="categoryImages"
          />

          { 
            (!isUpdate && currentCategory.categoryLevel < 1) || (isUpdate && currentCategory.categoryLevel === 1) ?
            <GoFormItemSingleUpload
              label="背景图"
              form={form}
              defaultConfig={{ defaultList: category && category.background ? [{ uid: '-1', imageUrl: category.background, name: 'img', status: 'done'}] : [] }}
              fieldName="backgrounds"
            /> : null
          }

          { 
            (!isUpdate && currentCategory.categoryLevel === 2) || (isUpdate && currentCategory.categoryLevel === 3) ?
            <Form.Item label="分配比例">
              {getFieldDecorator('discount', {
                initialValue: category && category.discount ? category.discount : 50
              })(
                <SliderBar style={{ width: 400 }} />
              )}
            </Form.Item> : null
          }

          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={handleSubmit}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const SliderBar = forwardRef((props:any, ref:any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>优惠 <Slider {...props} ref={() => ref} /> 赠送</div>
))

// const sp = {
//   'development': { lv1: 2, lv2: 4, lv3: 7}
// }[process.env.APP_ENV!] || 

const ClassifyAddEditForm = Form.create()(ClassifyAddEdit)

export default ClassifyAddEditForm