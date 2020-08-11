import React, { useEffect } from 'react'
import styles from './spus.module.less'
import SortableList from './SortableList'

const treeData = [
  {
    name: '家用电器',
    index: 1,
    status: '开启',
    created: '2016-09-21  08:50:08',
    action: '新增子类 编辑 删除',
    children: [
      {
        name: '大家电',
        index: 11,
        status: '关闭',
        created: '2016-09-21  08:50:08',
        action: '新增子类 编辑 删除',
        children: [
          {
            name: '空调',
            index: 111,
            status: '关闭',
            created: '2016-09-21  08:50:08',
            action: '新增子类 编辑 删除'
          },
          {
            name: '液晶电视',
            index: 112,
            status: '关闭',
            created: '2016-09-21  08:50:08',
            action: '新增子类 编辑 删除'
          }
        ]
      },
      {
        name: '小家电',
        index: 12,
        status: '开启',
        created: '2016-09-21  08:50:08',
        action: '新增子类 编辑 删除'
      }
    ]
  },
  {
    name: '时尚服装',
    index: 2,
    status: '开启',
    created: '2016-09-21  08:50:08',
    action: '新增子类 编辑 删除'
  }
]

const ClassifyDrapTree = ({ data, onHandle, onClassify }:any) => {
  return (
    <div className={styles.classifyBox}>
      <div className='group-parent-node' style={{ background: '#fafafa', margin: '0 -20px', padding: '0 20px' }}>
        <h4 className="name">分类名称</h4><h4>分配比例</h4><h4>状态</h4><h4>添加时间</h4><h4>操作</h4>
      </div>
      <SortableList tree={data} onHandle={onHandle} onClassify={onClassify} />
    </div>
  )
}

export default ClassifyDrapTree