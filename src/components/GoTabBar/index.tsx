import React, { useState, cloneElement, ReactNode } from 'react'
import styles from './index.module.less'

type IProps = {
  onChange?: (key: string, name: any) => void,
  children: ReactNode[],
  defaultActiveKey?: string
}

const TabBar = ({ onChange, children = [], defaultActiveKey }:IProps) => {
  const [ statekey, setStatekey ] = useState(defaultActiveKey)
  const onTanChange = (key:string, name:any) => {
    setStatekey(key)
    onChange && onChange(key, name)
  }
  return (
    <ul className={styles.tabbar}>
      { children.map((com:any) => cloneElement(com, { onTanChange, statekey })) }
    </ul>
  )
}

TabBar.Item = ({ value, children, statekey, onTanChange }:any) => {
  return <li key={value} className={value === statekey ? 'active' : ''} onClick={() => onTanChange!(value, children)}>{ children }</li>
}

export default TabBar