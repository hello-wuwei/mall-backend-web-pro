import React, { useEffect, useState, ReactNode, forwardRef, Component } from 'react'
import { Button, PageHeader, Form, Input, Switch, Upload, Icon, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { RouteComponentProps } from 'react-router-dom'
import { formItemLayout, formTailLayout } from '@/config'
import styles from './index.module.less'
import {  } from 'components'
import { uploadPicUrl, getHeaders } from '@/api/config'
import history from '@/history'
import { getBase64, limitSize } from '@/util'
import api from '@/api';

const AddOrEditBrand = ({ location, form }:RouteComponentProps & FormComponentProps) => {
  const { getFieldDecorator } = form
  const brandCode = location.state.brandCode
  const [ brand, setBrand ] = useState<any>(null)
  useEffect(() => {
    brandCode && getBrand()
  }, [])
  const getBrand = async () => {
    const res = await api.brand.getBrand({ brandCode })
    setBrand(res.data)
  }

  const handleSubmit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (brandCode) {
          values.brandLogo = values.brandLogo ? values.brandLogo[0].url : undefined
          values.brandCode = brandCode
          update(values)
        } else {
          values.brandLogo = values.brandLogo ? values.brandLogo[0].url : undefined
          add(values)
        }
      }
    })
  }

  const add = async (data:object) => {
    await api.brand.addBrand(data)
    message.success('添加成功')
    history.goBack()
  }

  const update = async (data:object) => {
    await api.brand.updateBrand(data)
    message.success('编辑成功')
    history.goBack()
  }

  const [ loading, setLoading ] = useState(false)
  
  const [ imageUrl, setImageUrl ] = useState('')
  useEffect(() => {
    brand && setImageUrl(brand.brandLogo)
  }, [brand])
  const handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:string) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  };

  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    e && (e.file.url = e.file.response ? e.file.response.data : '')
    return e && [e.file]
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传</div>
    </div>
  )

  return (
    <div className='go-main-info-page'>
      <PageHeader style={{ padding: 0, paddingBottom: 30 }} title={brandCode ? '编辑品牌' : '添加品牌'} extra={[<Button onClick={() => history.goBack()}>返回</Button>]} />
    
      <div className="form">
        <Form {...formItemLayout} className="login-form">
          <Form.Item label="品牌名称">
            {getFieldDecorator('brandName', {
              initialValue: brand ? brand.brandName : '',
              rules: [
                { required: true, message: '请输入品牌名称!' },
                { max: 16, message: '名称不超过16个字符' }
              ]
            })(
              <Input placeholder="请输入品牌名称" style={{ width: '40%' }} />
            )}
          </Form.Item>
          <Form.Item label="品牌别名">
            {getFieldDecorator('brandSubName', {
              initialValue: brand ? brand.brandSubName : '',
              rules: [
                { max: 16, message: '别名不超过20个字符' }
              ]
            })(
              <Input placeholder="请输入品牌别名" style={{ width: '40%' }} />,
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: brand ? brand.description : '',
              rules: [{ max: 140, message: '描述不超过140个字符' }]
            })(
              <Input.TextArea placeholder="请输入描述" style={{ width: '40%' }} />
            )}
          </Form.Item>
          <Form.Item label="品牌LOGO">
            {getFieldDecorator('brandLogo', {
              initialValue: brand ? [{uid: '-1', url: brand.brandLogo, name: 'image.png', status: 'done'}] : '',
              valuePropName: 'fileList',
              getValueFromEvent: normFile
            })(
              <Upload
                name="file"
                accept=".png,.jpg,.jpeg"
                data={{ type: 8 }}
                headers={getHeaders()}
                listType="picture-card"
                className={styles['logo-uploader']}
                showUploadList={false}
                action={uploadPicUrl}
                beforeUpload={(file) => limitSize(file, 4)}
                onChange={handleChange}
              >
                { imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="是否显示">
            {getFieldDecorator('brandDisplay', {
              initialValue: brand ? brand.brandDisplay : true,
              valuePropName: 'checked'
            })(
              <Switch />
            )}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={handleSubmit}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const AddOrEditBrandForm = Form.create()(AddOrEditBrand)
export default AddOrEditBrandForm