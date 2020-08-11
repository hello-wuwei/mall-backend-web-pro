import React, { useState, useEffect } from 'react'
import { Form, Upload, Icon, Modal } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { uploadPicUrl, getHeaders } from '@/api/config'
import { limitSize } from '@/util'
import styles from './index.module.less'

type DefaultConfig = {
  defaultList: object[],
  urlField?: string,
  nameField?: string
}

type OtherProps = {
  defaultConfig?: DefaultConfig,
  label: string,
  fieldName: string,
  disabled?: boolean,
  maxNumber?: number
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

const getBase64 = (file:any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result!);
    reader.onerror = error => reject(error);
  });
}

const fileFields = {
  urlField: 'imageUrl', nameField: 'name', defaultList: []
}


const GoFormItemUpload = ({ form, defaultConfig = { defaultList: [] }, label = '', fieldName, maxNumber = 6, disabled = false }:FormComponentProps & OtherProps) => {
  const { getFieldDecorator } = form
  const config:DefaultConfig = { ...fileFields, ...defaultConfig }
  const [ fileList, setFileList ] = useState(format(config))

  useEffect(() => {
    config.defaultList.length && setFileList(format(config))
  }, [defaultConfig.defaultList])

  const handleChange = ({ fileList }:any) => setFileList(fileList)

  const uploadButton = (
    <div>
      <Icon type="plus" />
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

  const [ show, setShow ] = useState({ previewImage: '', previewVisible: false })
  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setShow({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  };

  const { previewVisible, previewImage } = show;

  return (
    <div className={styles.uploadImg}>
      <Form.Item label={label}>
        {getFieldDecorator(fieldName, {
          initialValue: fileList,
          valuePropName: 'fileList',
          getValueFromEvent: normFile
        })(
          <Upload
            disabled={disabled}
            name="file"
            accept=".png,.jpg,.jpeg"
            data={{ type: 8 }}
            headers={getHeaders()}
            listType="picture-card"
            action={uploadPicUrl}
            beforeUpload={(file) => limitSize(file, 4)}
            onChange={handleChange}
            onPreview={handlePreview}
          >
            { fileList.length >= maxNumber || disabled ? null : uploadButton }
          </Upload>
        )}
      </Form.Item>
      <Modal title="预览" visible={previewVisible} footer={null} onCancel={() => setShow({ ...show, previewVisible: false })}>
        <img alt="预览图" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default GoFormItemUpload