import React, { FC } from 'react'
import Menu from './Menu'
import styles from './index.module.less'

type Iprops = {
  collapsed: boolean
}

const SiderBar:FC<Iprops> = ({ collapsed }) => {
  return (
    <div className={styles.siderbar}>
      <div className="logo">
        {!collapsed && '智惠行商城管理系统'}
      </div>
      <Menu />
    </div>
  )
}

export default SiderBar