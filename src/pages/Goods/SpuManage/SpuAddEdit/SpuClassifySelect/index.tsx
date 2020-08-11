import React, { forwardRef, CSSProperties, useState, useEffect } from 'react'
import { Cascader } from 'antd'
import { CascaderProps } from 'antd/es/cascader'
import api from '@/api'

const classOptions = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

// type Option = {
//   value: string;
//   label?: React.ReactNode;
//   disabled?: boolean;
//   children?: Option[];
// }

type Option = {
  options?: any
}

type IProps = {
  options?: any
} & CascaderProps & CSSProperties

const fieldNames = {
  label: 'categoryName',
  value: 'categoryCode',
  children: 'childNode'
}

const SpuClassifySelect = (props:any, ref:any ) => {
  const [options, setOptions] = useState([])
  const getClasses = async () => {
    const res = await api.classify.getClassifyData()
    setOptions(res.data)
  }
  useEffect(() => {
    getClasses()
  }, [])
  return (
    <Cascader ref={ref} {...props} options={options} fieldNames={fieldNames} />
  )
}

export default forwardRef(SpuClassifySelect)