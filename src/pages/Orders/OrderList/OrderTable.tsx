import React from 'react'
import { GoTable } from 'components'
import { columns } from './config'

type IProps = {
  dataSource: any[],
  pagination: any,
  rowKey: string
}

const PageTable = ({ rowKey, dataSource, pagination }:IProps) => {
  return (
    <div style={{ marginTop: 20 }}>
      <GoTable rowKey={rowKey} columns={columns} dataSource={dataSource} pagination={pagination} />
    </div>
  )
}

export default PageTable