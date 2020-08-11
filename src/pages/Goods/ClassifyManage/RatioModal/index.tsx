import React, { useState, useEffect, forwardRef } from 'react'
import { Modal, message, Input, Form, Slider } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import history from '@/history'
import api from '@/api'
import { modalFormItemLayout } from '@/config'

type IProps = {
  visible: boolean,
  setVisible: any,
  category: any,
  getClassifyData: () => void
} & FormComponentProps

const RatioModal = ({ visible, setVisible, category, getClassifyData, ...props }:IProps) => {
  const { getFieldDecorator } = props.form
  const handleOk = () => {
    props.form.validateFieldsAndScroll((err:any, values:any) => {
      if (!err) {
        const params = {
          discount: values.discount,
          present: 100 - values.discount,
          categoryCode: category.categoryCode,
        }
        onFetch(params)
      }
    })
  }

  const onFetch = async (params:any) => {
    
    await api.classify.updateRadio(params)
    message.success('调整成功')
    handleCancel()
    getClassifyData()
  }
  
  const handleCancel = () => {
    props.form.resetFields()
    setVisible(false)
  }
  return (
    <Modal
      title="调整分配比例"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form className="form">
        <Form.Item>
          {getFieldDecorator('discount', {
            initialValue: 50
          })(
            <SliderBar style={{ width: 400 }} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const SliderBar = forwardRef((props:any, ref:any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>优惠 <Slider {...props} ref={() => ref} /> 赠送</div>
))

export default Form.create<IProps>()(RatioModal)