// const isJSON = (str:string) => {
//   try {
//     if (typeof JSON.parse(str) == "object") {
//       return true;
//     }
//   } catch(e) {
//     return false
//   }
//   return false;
// }
import { message } from 'antd'

export const setSessionStorage = (field:string, data:any) => {
  sessionStorage.setItem(field, JSON.stringify(data))
}
export const getSessionStorage = (field:string) => {
  const item = sessionStorage.getItem(field)
  return item ? JSON.parse(item) : item
}
export const clearSessionStorage = (field:string) => sessionStorage.removeItem(field)

export const setLocalStorage = (field:string, data:any) => {
  localStorage.setItem(field, JSON.stringify(data))
}
export const getLocalStorage = (field:string) => {
  const item = localStorage.getItem(field)
  return item ? JSON.parse(item) : item
}
export const clearLocalStorage = (field:string) => localStorage.removeItem(field)

export const joinAddress = (obj:any):string => {
  const province = obj.province ? obj.province : ''
  const city = obj.city ? obj.city : ''
  const area = obj.area ? obj.area : ''
  const street = obj.street ? obj.street : ''
  const address = obj.address ? obj.address : ''
  return province + city + area + street + address
}

export const clearEmptyValue = (obj:any) => {
  let cloneObj = {...obj}
  for(let key in cloneObj) {
    if (cloneObj[key] === '') {
      delete cloneObj[key]
    }
  }
  return cloneObj
}

// 页面筛选条件过滤
export const onFilter = (params:any, filter:object) => {
  let data = filter.hasOwnProperty('page') ? {...params, ...filter} : {...params, ...filter, page: 1}
  return data
}

// base64 -> imgUrl
export const getBase64 = (img:any, callback:any) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export const limitSize = (file:any, maxSize:number) => {
  const isLt2M = file.size / 1024 / 1024 < maxSize;
  if (!isLt2M) {
    message.error('图片大小不能超过'+ maxSize +'M!');
  }
  return isLt2M;
}
