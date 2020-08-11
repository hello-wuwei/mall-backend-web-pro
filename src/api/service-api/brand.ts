import { get, post, put, del } from '../http'

export const getBrands = (data?: object) => get('/brand/brand-list', data!) // 获取品牌列表

export const getPageBrands = (data?: object) => post('/brand/list', data!) // 获取品牌分页列表

export const deleBatchBrand = (data?: object) => post('/brand/delete-batch', data!) // 批量删除

export const addBrand = (data?: object) => post('/brand/insert', data!)  //添加品牌

export const updateBrand = (data?: object) => post('/brand/update', data!)  // 更新品牌

export const getBrand = (data?: object) => get('/brand/echo', data!)  // 获取品牌详细信息

export const updateBrandStatus = (data?: object) => post('/brand/status', data!)  // 更新品牌状态