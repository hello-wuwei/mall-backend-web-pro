import React from 'react'
import { Modal, message, Input, Form } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { GoFuzzySelect } from 'components'
import history from '@/history'
import api from '@/api'
import { modalFormItemLayout } from '@/config'

type IProps = {
  visible: boolean,
  setVisible: any,
  orderCode: any
} & FormComponentProps

const SendGoodsModal = ({ visible, setVisible, orderCode, ...props }:IProps) => {
  const { getFieldDecorator } = props.form
  const handleOk = () => {
    props.form.validateFieldsAndScroll((err:any, values:any) => {
      if (!err) {
        const params = {
          ...values,
          orderCode,
        }
        onSendGoods(params)
      }
    })
  }

  const onSendGoods = async (params:any) => {
    
    await api.order.sendGoods(params)
    message.success('发货成功')
    history.goBack()
  }
  
  const handleCancel = () => {
    props.form.resetFields()
    setVisible(false)
  }
  return (
    <Modal
      title="确认发货"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...modalFormItemLayout} className="form">
        <Form.Item label="物流公司">
          {getFieldDecorator('logisticsCompanyCode', {
            rules: [{ required: true, message: '请选择物流公司!' }],
          })(
            <GoFuzzySelect enmuType="enmu_logistics_companys" placeholder="请选择物流公司" />,
          )}
        </Form.Item>
        <Form.Item label="物流单号">
          {getFieldDecorator('trackingNumber', {
            rules: [{ required: true, message: '请输入物流单号!' }],
          })(
            <Input placeholder="请输入物流单号" />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create<IProps>()(SendGoodsModal)