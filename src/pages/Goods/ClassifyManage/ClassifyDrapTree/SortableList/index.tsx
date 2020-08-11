import React, { useEffect , useRef, useState } from 'react'
import Sortable from 'sortablejs'
import styles from './spus.module.less'
import moment from 'moment'
import { Button, Icon } from 'antd'

// type ItemIProps = {
//   name: string,
//   level?: number,
//   index?: number,
//   status?: string,
//   created?: string,
//   action?: string,
//   children?: any[]
// }

type IProps = {
  tree: any[],
  textIndent?: number,
  onHandle: (item:object) => void,
  onClassify: (item:object, type:string, parent:object) => void,
  parentCategory?: object | null
}

const SortableTree = ({ tree, textIndent = 15, onHandle, onClassify, parentCategory = null }:IProps) => {
  const ref = useRef(null)
  const level = tree[0].level || 0  // 默认为0（即为一级节点）
  
  useEffect(() => {
    Sortable.create(ref.current!, {
      handle: `.group-parent-node-${level}`
    })
  }, [])

  return (
    <ul ref={ref} id="items" className={styles.spus}>
      {
        tree.map((item:any) => (
          <TreeGroup
            key={item.categoryName}
            item={item}
            level={level}
            textIndent={textIndent}
            onClassify={onClassify}
            onHandle={onHandle}
            parentCategory={parentCategory}
          />
        ))
      }
    </ul>
  )
}

const TreeGroup = ({ item, level, textIndent, onClassify, onHandle, parentCategory }:any) => {
  const [ open, setOpen ] = useState(false)

  const onSwitch = () => {
    setOpen(!open)
  }
  return (
    <li>
      <div className={`group-parent-node group-parent-node-${level}`}>
        <div onClick={onSwitch} style={{ textIndent: level * textIndent }} className="name">
          { item.childNode && item.childNode.length ? <SwitchCaret open={open} /> : <i className="empty-allow"></i> }
          {item.categoryName}
        </div>
        <div onClick={onSwitch}>{ level === 2 ? (item.discount && item.present) ? `优惠：赠送(${item.discount}：${item.present})` : '--' : '--' }</div>
        <div onClick={onSwitch}>{item.displayFlag ? '开启' : '关闭'}</div>
        <div onClick={onSwitch}>{moment(item.createTime).format('YYYY-MM-DD')}</div>
        <div className="action">
          { level === 2 ? <Button style={{ color: '#ff9800' }} type="link" onClick={() => onHandle(item)}>调整比例</Button> : null }
          { level === 0 || level === 1 ? <Button style={{ color: '#04c114' }} type="link" onClick={() => onClassify(item, 'create', parentCategory!)}>添加子类</Button> : null  }
          <Button type="link" onClick={() => onClassify(item, 'update', parentCategory!)}>编辑</Button>
        </div>
      </div>
      { item.childNode && item.childNode.length ?
        <div className={`group-children-node ${open ? '' : 'closed'}`} style={{ maxHeight: computes(item.childNode) * 55 }}>
          <SortableTree tree={item.childNode.map((child:any) => { child["level"] = level + 1; return child })} onHandle={onHandle} onClassify={onClassify} parentCategory={item} />
        </div> : null
      }
    </li>
  )
}

const computes = (childNode:any[] = []) => {
  let count = 0
  const loop = (childNode:any[]) => {
    if (childNode && childNode.length) {
      count = count + childNode.length
      childNode.forEach((item => {
        if (item.childNode && item.childNode.length) {
          loop(item.childNode)
        }
      }))
    }
  }
  loop(childNode)
  return count
}

const SwitchCaret = ({ open }:{ open:boolean }) => open ? <Icon type="caret-down" /> : <Icon type="caret-right" />

export default SortableTree