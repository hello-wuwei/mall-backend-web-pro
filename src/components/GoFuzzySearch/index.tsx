import React, { useState, useEffect, forwardRef } from 'react'
import { Select, AutoComplete } from 'antd'
import { SelectProps } from 'antd/es/select'
import { AutoCompleteProps } from 'antd/es/auto-complete'

const clearEmoji = (text:string) => {
  return text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
}


// 模糊搜索控件
type KeyConfig = {
  keyName: string,
  valueName: string
}

type SearchSelectProps = {
  fetch: (value: string, cb: (data:any) => void) => void,
  optionConfig?: KeyConfig,
  // value?: string | number,
  // notFoundContent?: string | ReactNode,
  // onChange?: (value:any) => void,
  allData?: any[]
} & SelectProps

export const SearchSelect = forwardRef((props:SearchSelectProps, ref:any) => {
  const { fetch, allData = [], placeholder = '请输入关键字', optionConfig = { keyName: 'id', valueName: 'name' }, notFoundContent = '暂无数据', ...restProps } = props
  // const [ currentValue, setCurrentValue ] = useState(value)
  const [ data, setData ] = useState<any[]>([])
  const [ empty, setEmpty ] = useState<any>('')
  const handleSearch = (value:any) => {
    value ? setEmpty(notFoundContent) : setEmpty('')
    if (value === '' && allData.length) {
      setData(allData)
    } else {
      fetch(value, data => setData(data))
    }
    // value && allData.length === 0 ? fetch(value, data => setData(data)) : setData(allData)
  }

  useEffect(() => {
    allData && allData.length && setData(allData)
  }, [allData])

  // const handleChange = (value:any) => {
  //   onChange && onChange(value)
  //   setCurrentValue(value)
  // }

  const keyName = optionConfig.keyName
  const valueName = optionConfig.valueName
  const options = data.map(option => <Select.Option key={option[keyName]} value={option[keyName]}>{option[valueName]}</Select.Option>);
  return (
    <Select
      ref={() => ref}
      showSearch
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      allowClear={true}
      notFoundContent={<div style={{ textAlign: 'center' }}>{empty}</div>}
      {...restProps}
    >
      {options}
    </Select>
  )
})

type SearchInputIProps = {
  fetch: (value: string, cb: (data:any) => void) => void,
  allData?: any[]
} & AutoCompleteProps
  
export const SearchInput = (props:SearchInputIProps) => {
  const { fetch, allData = [], placeholder = '请输入关键字', ...restProps } = props
  // const [ currentValue, setCurrentValue ] = useState(value)
  const [ data, setData ] = useState<any[]>([])
  const handleSearch = (value:any) => {
    // const text = clearEmoji(value)
    if (value === '' && allData.length) {
      setData(allData)
    } else {
      fetch(value, data => setData(data))
    }
    // value && fetch(value, data => setData(data))
  }

  useEffect(() => {
    allData && allData.length && setData(allData)
  }, [allData])

  return (
    <AutoComplete
      dataSource={data}
      // onSelect={handleSelect} // 只对选择项点击有回调（对输入无效）
      onSearch={handleSearch}
      placeholder={placeholder}
      {...restProps}
    />
  )
}
