import React, { useState } from 'react'
import { Input } from 'antd'
import { InputProps } from 'antd/es/input'

type IProps = {
  mode: 'mobile' | 'orderCode'
} & InputProps

const rules:any = {
  mobile: (value:any) => /^\d{0,11}$/.test(value),
  orderCode: (value:any) => /^\d*$/.test(value)
}

const GoInput = ({ onChange, mode, ...restProps}:IProps) => {
  const [ v, setV ] = useState('')
  const onInput = (e:any) => {
    if (rules[mode](e.target.value)) {
      onChange && onChange(e)
      restProps.value === undefined && setV(e.target.value)
    }
  }
  return <Input value={v} onChange={onInput} {...restProps} />
}

export default GoInput