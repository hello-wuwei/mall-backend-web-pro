import React from 'react'
import { Input, Tooltip } from 'antd';

const formatNumber = (value:any) => {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

const GoNumberInput = (props:any) => {
  const onChange = (e:any) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  const onBlur = () => {
    const { value = '', onBlur, onChange } = props;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  const { value } = props;
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
  ) : (
    '输入数字'
  );
  return (
    <Tooltip
      trigger="focus"
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="请输入数字"
        maxLength={25}
      />
    </Tooltip>
  );
}

export default GoNumberInput