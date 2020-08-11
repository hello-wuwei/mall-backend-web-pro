import React, { useState, useEffect, forwardRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import { gets, GetsTypes } from '../get-dictionary'
import { SearchSelect } from '../GoFuzzySearch'

const Option = Select.Option

type Option = {
  id: string | number,
  name: string
}

type IProps = {
  enmuType: GetsTypes,
  extraOptions?: Option[],
  all?:boolean
} & SelectProps

const GoFuzzySelect = ({ enmuType, extraOptions = [], all = false, ...originProps }:IProps, ref:any) => {
  const [ list, setList ] = useState<Option[]>([])
  useEffect(() => {
    getDicList()
  }, [])

  const getDicList = async () => {
    const options = await gets[enmuType]()
    setList([...options, ...extraOptions])
  }

  const fetch = (value:any, setOptions:any) => {
    let options = []
    const reg = new RegExp(value)
    if(value.length > 0){
      for(let i = 0; i < list.length; i++){
        const temp = list[i].name;
        if(temp.match(reg)){
          options.push(list[i]);
        }
      }
    }
    setOptions(options)
  }

  return (
    <SearchSelect fetch={fetch} allData={all ? list : []} {...originProps} ref={ref} />
  )
}

export default forwardRef(GoFuzzySelect)