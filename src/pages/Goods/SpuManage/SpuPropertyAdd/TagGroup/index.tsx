import React, { useState, useEffect } from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd';
import styles from './index.module.less'

const EditableTagGroup = ({ tags, onChange }:any) => {

  // const [ tags, setTags ] = useState<string[]>([])
  const [ inputVisible, setInputVisible ] = useState(false)
  const [ inputValue, setInputValue ] = useState('')
  let ref:any;
  

  const handleClose = (removedTag:any) => {
    const newTags = tags.filter((tag:any) => tag !== removedTag);
    console.log(newTags);
    onChange(newTags)
    // setTags(newTags)
  };

  const showInput = () => {
    setInputVisible(true)
    // this.setState({ inputVisible: true }, () => this.input.focus());
  };

  useEffect(() => {
    inputVisible && ref.focus()
  }, [inputVisible])

  const handleInputChange = (e:any) => {
    const value = e.target.value.trim()
    if (value.lenght > 16) {
      return
    }
    setInputValue(e.target.value.trim())
  };

  const handleInputConfirm = () => {
    let newTags:any = [...tags]
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    console.log(newTags);
    // setTags(newTags)
    onChange(newTags)
    setInputVisible(false)
    setInputValue('')
  };

//   saveInputRef = input => (this.input = input);

  return (
    <div className={styles.tabGroup}>
      {tags.map((tag:string, index:number) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag key={tag} closable onClose={() => handleClose(tag)}>
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={(input) => ref = input}
          type="text"
          size="small"
          style={{ width: 78, height: 32 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="add-tag">
          <Icon type="plus" /> 添加值
        </Tag>
      )}
    </div>
  )
}

export default EditableTagGroup