import React, { useState, useEffect } from 'react'
import { Form, Upload, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { uploadPicUrl, getHeaders } from '@/api/config'
import { limitSize, getBase64 } from '@/util'
import styles from './index.module.less'

type DefaultConfig = {
  defaultList: any[],
  urlField?: string,
  nameField?: string
}

type OtherProps = {
  defaultConfig?: DefaultConfig,
  label: string,
  fieldName: string,
  disabled?: boolean
}

const format = ({ defaultList, urlField, nameField }:DefaultConfig) => {
  const newFiles = defaultList.map((file:any, index) => {
    file.uid = '-' + (index + 1)
    file.url = file[urlField!]
    file.name = file[nameField!] || 'no_name',
    file.status = 'done'
    return file
  })
  return newFiles
}

const fileFields = {
  urlField: 'imageUrl', nameField: 'name', defaultList: []
}


const GoFormItemUpload = ({ form, defaultConfig = { defaultList: [] }, label = '', fieldName, disabled = false }:FormComponentProps & OtherProps) => {
  // console.log(defaultConfig)
  const { getFieldDecorator } = form
  const config:DefaultConfig = { ...fileFields, ...defaultConfig }
  const [ fileList, setFileList ] = useState(format(config))

  useEffect(() => {
    if (config.defaultList.length) {
      setFileList(format(config))
      setImageUrl(defaultConfig.defaultList[0][config.urlField!])
    }
  }, [defaultConfig.defaultList])

  const [ imageUrl, setImageUrl ] = useState('')
  const [ loading, setLoading ] = useState(false)
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

  
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传</div>
    </div>
  )

  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    e && e.fileList.forEach((file:any) => {
      file.url = file.response ? file.response.data : ''
    })
    return e && e.fileList
  }

  return (
    <Form.Item label={label}>
      {getFieldDecorator(fieldName, {
        initialValue: fileList,
        valuePropName: 'fileList',
        getValueFromEvent: normFile
      })(
        <Upload
          name="file"
          data={{ type: 8 }}
          headers={getHeaders()}
          listType="picture-card"
          className={styles['logo-uploader']}
          showUploadList={false}
          action={uploadPicUrl}
          beforeUpload={(file) => limitSize(file, 4)}
          onChange={handleChange}
          // onPreview={handlePreview}
        >
          { imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton }
        </Upload>
      )}
    </Form.Item>
  )
}

export default GoFormItemUpload