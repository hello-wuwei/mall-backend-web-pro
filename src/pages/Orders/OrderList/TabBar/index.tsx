import React from 'react'
import { enmu_order_status } from '@/enmu'
import styles from './index.module.less'

const TabBar = ({ status, onTabChange }:any) => {
  return (
    <ul className={styles.tabbar}>
      { [{ name: '全部', id: '' }, ...enmu_order_status.list].map(item => (
        <li key={item.id} className={status === item.id ? 'active' : ''} onClick={() => onTabChange(item.id.toString())}>{ item.name }</li>)
      )}
    </ul>
  )
}

export default TabBar