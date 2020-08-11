import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import api from '@/api'
import store from '@/store'

const LoginForm = (props:FormComponentProps) => {
  const handleSubmit = (e:any) => {
    // history.push('/spu-manage')
    e.preventDefault();
    props.form.validateFields((err:any, values:any) => {
      if (!err) {
        loginIn(values)
      }
    });
  };

  const loginIn = async (data:any) => {
    const res = await api.user.loginIn(data)
    if (res.data) {
      store.loginUser.loginIn(res.data)
    } else {
      message.error('用户信息无效')
    }
  }

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入用户名!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住密码</Checkbox>)}
        <a className="login-form-forgot" href="">
          忘记密码
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登 录
        </Button>
        <a href="">马上注册!</a>
      </Form.Item>
    </Form>
  )
}

export default Form.create({ name: 'normal_login' })(LoginForm);