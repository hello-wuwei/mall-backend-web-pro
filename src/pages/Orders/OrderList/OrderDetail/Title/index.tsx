import React, { FC } from 'react'
import styles from './index.module.less'

const OrderBaseInfo:FC = ({ children }) => {
  return (
    <h3 className={styles.title}>{children}</h3>
  )
}

export default OrderBaseInfo