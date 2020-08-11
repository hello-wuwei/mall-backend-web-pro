import React, { useState, useEffect, forwardRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import { gets, GetsTypes } from '../get-dictionary'

const Option = Select.Option

type Option = {
  id: string | number,
  name: string
}

type IProps = {
  enmuType: GetsTypes,
  extraOptions?: Option[],
  fuzzy?: boolean,
  all?:boolean
} & SelectProps

const McDicSelect = ({ enmuType, extraOptions = [], fuzzy = false, ...originProps }:IProps, ref:any) => {
  const [ list, setList ] = useState<Option[]>([])
  useEffect(() => {
    getDicList()
  }, [])

  const getDicList = async () => {
    const options = await gets[enmuType]()
    setList([...options, ...extraOptions])
  }

  return (
    <Select {...originProps} ref={() => ref}>
      { list.map((option:Option) => <Option key={option.id} value={option.id}>{ option.name }</Option>) }
    </Select>
  )
}

export default forwardRef(McDicSelect)