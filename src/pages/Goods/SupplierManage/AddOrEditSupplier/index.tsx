import React, { useEffect, useState, ReactNode, forwardRef, Component } from 'react'
import { Button, PageHeader, Form, Input, Switch, Upload, Icon, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { RouteComponentProps } from 'react-router-dom'
import { formItemLayout, formTailLayout } from '@/config'
import styles from './index.module.less'
import {  } from 'components'
import { uploadPicUrl, getHeaders } from '@/api/config'
import history from '@/history'
import { getBase64 } from '@/util'
import api from '@/api';

const beforeUpload = (file:any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传png和jpg格式图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2M!');
  }
  return isJpgOrPng && isLt2M;
}

const AddOrEditSupplier = ({ location, form }:RouteComponentProps & FormComponentProps) => {
  const { getFieldDecorator } = form
  const merchantCode = location.state.merchantCode
  const [ merchant, setMerchant ] = useState<any>(null)
  useEffect(() => {
    merchantCode && getMerchant()
  }, [])
  const getMerchant = async () => {
    const res = await api.supplier.getSupplier({ merchantCode })
    setMerchant(res.data)
  }

  const handleSubmit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.logoUrl = values.logoUrl ? values.logoUrl[0].url : undefined
        values.background = values.background ? values.background[0].url : undefined
        if (merchantCode) {
          values.merchantCode = merchantCode
          update(values)
        } else {
          add(values)
        }
      }
    })
  }

  const add = async (data:object) => {
    await api.supplier.addSupplier(data)
    message.success('添加成功')
    history.goBack()
  }

  const update = async (data:object) => {
    await api.supplier.updateSupplier(data)
    message.success('编辑成功')
    history.goBack()
  }

  const [ loading, setLoading ] = useState(false)
  
  const [ imageUrl, setImageUrl ] = useState('')
  const [ imageBgUrl, setImageBgUrl ] = useState('')
  useEffect(() => {
    merchant && setImageUrl(merchant.logoUrl)
    merchant && setImageBgUrl(merchant.background)
  }, [merchant])
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

  const handleBgChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:string) => {
        setImageBgUrl(imageUrl)
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
      <PageHeader style={{ padding: 0, paddingBottom: 30 }} title={ merchantCode ? '编辑供应商' : '添加供应商'} extra={[<Button onClick={() => history.goBack()}>返回</Button>]} />
    
      <div className="form">
        <Form {...formItemLayout} className="login-form">
          <Form.Item label="供应商名称">
            {getFieldDecorator('merchantName', {
              initialValue: merchant ? merchant.merchantName : '',
              rules: [
                { required: true, message: '请输入供应商名称!' },
                { max: 16, message: '名称不超过16个字符' }
              ]
            })(
              <Input placeholder="请输入供应商名称" style={{ width: '40%' }} />
            )}
          </Form.Item>
          <Form.Item label="供应商别名">
            {getFieldDecorator('merchantSubName', {
              initialValue: merchant ? merchant.merchantSubName : '',
              rules: [
                { max: 16, message: '别名不超过20个字符' }
              ]
            })(
              <Input placeholder="请输入供应商别名" style={{ width: '40%' }} />,
            )}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: merchant ? merchant.description : '',
              rules: [{ max: 140, message: '描述不超过140个字符' }]
            })(
              <Input.TextArea placeholder="请输入描述" style={{ width: '40%' }} />
            )}
          </Form.Item>
          <Form.Item label="供应商LOGO">
            {getFieldDecorator('logoUrl', {
              initialValue: merchant ? [{uid: '-1', url: merchant.logoUrl, name: 'image.png', status: 'done'}] : '',
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            })(
              <Upload
                name="file"
                data={{ type: 8 }}
                headers={getHeaders()}
                listType="picture-card"
                className={styles['logo-uploader']}
                showUploadList={false}
                action={uploadPicUrl}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                { imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="店铺背景图">
            {getFieldDecorator('background', {
              initialValue: merchant ? [{uid: '-1', url: merchant.background, name: 'image.png', status: 'done'}] : '',
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            })(
              <Upload
                name="file"
                data={{ type: 8 }}
                headers={getHeaders()}
                listType="picture-card"
                className={styles['logo-uploader']}
                showUploadList={false}
                action={uploadPicUrl}
                beforeUpload={beforeUpload}
                onChange={handleBgChange}
              >
                { imageBgUrl ? <img src={imageBgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="是否显示">
            {getFieldDecorator('displayFlag', {
              initialValue: merchant ? merchant.displayFlag : true,
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

const AddOrEditSupplierForm = Form.create()(AddOrEditSupplier)
export default AddOrEditSupplierForm