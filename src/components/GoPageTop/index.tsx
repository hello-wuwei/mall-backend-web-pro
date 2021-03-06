import React, { FC, CSSProperties, ReactNode } from 'react'
type IProps = {
  title?: string,
  style?: CSSProperties,
  children?: ReactNode,
  actions?: ReactNode
}

const defaultStyle:CSSProperties = {
  background: '#fff',
  padding: 20,
  paddingBottom: 0
}

const titleStyle = {
  marginBottom: 20,
  fontSize: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const GoPageTop = ({ title, children, style, actions = null }: IProps) => {
  return (
    <div style={{ ...defaultStyle, ...style }}>
      <div style={titleStyle}><div>{ title }</div><div>{actions}</div></div>
      <div style={{ display: "flex", flexWrap: 'wrap', alignItems: 'center' }}>
        { children }
      </div>
    </div>
  )
}

type ItemProps = {
  label?: string,
  style?: CSSProperties
}

const Column:FC<ItemProps> = ({ label, children, style }) => {
  const defaultStyle = { display: 'flex', alignItems: 'center', paddingRight: 16, marginBottom: 20 }
  return (
    <div style={{ ...defaultStyle, ...style }}>
      { label ? <label>{ label }：</label> : null }
      <span style={{ flex: 1 }}>{ children }</span>
    </div>
  )
}

GoPageTop.Column = Column

export default GoPageTop