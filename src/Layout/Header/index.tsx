import React, { FC, HTMLProps } from 'react'
import { Icon, Avatar, Modal } from 'antd'
import styles from './header.module.less'
import store from '@/store'
type Iprops = {
  collapsed: boolean,
  onSwitch: () => void
} & HTMLProps<HTMLElement>

const Header: FC<Iprops> = ({ collapsed, onSwitch }) => {
  const LoginOut = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定要退出登录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk:() => {
        store.loginUser.loginOut()
      }
    });
  }
  return (
    <div className={styles.header}>
      <div className="left">
        <Icon style={{ fontSize: 20 }} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={onSwitch} />
      </div>
      <div className="right">
        <ul>
          <li>
            <Icon style={{ fontSize: 20 }} type="search" />
          </li>
          <li>
            <Icon style={{ fontSize: 20 }} type="bell" />
          </li>
          <li>
            <Avatar style={{ background: "#f56a00" }} icon="user" />
            <span style={{ marginLeft: 10 }}>{store.loginUser.user.userNickname}</span>
          </li>
          <li>
            <Icon style={{ fontSize: 20 }} type="poweroff" onClick={LoginOut} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header