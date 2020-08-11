import { get, post, put, del } from '../http'

export const getClassifyData = (data?: object) => get('/category/category-tree', data!) // 获取分类树

export const getClassifyByLevel = (data?:object) => get('/category/level', data)  // 以级别获取分类

export const updateRadio = (data?:object) => post('/category/update-ratio', data!)  // 调整比例

export const addCategory = (data?:object) => post('/category/insert', data!)  // 添加类别

export const getCategory = (data?:object) => get('/category/echo', data!)  // 回显类别

export const editCategory = (data?:object) => post('/category/update', data!)  // 编辑类别
