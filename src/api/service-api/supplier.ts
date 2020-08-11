// 供应商相关接口
import { get, post, put, del } from '../http'

export const getSuppliers = (data?:any) => get('/merchant/merchant-list', data) // 获取服务商列表

export const getPageSuppliers = (data?:any) => post('/merchant/list', data) // 获取服务商分页列表

export const deleBatchSupplier = (data?: object) => post('/merchant/delete', data!) // 批量删除

export const addSupplier = (data?: object) => post('/merchant/insert', data!)  //添加品牌

export const updateSupplier = (data?: object) => post('/merchant/update', data!)  // 更新品牌

export const getSupplier = (data?: object) => get('/merchant/echo', data!)  // 获取品牌详细信息

export const updateSupplierStatus = (data?: object) => post('/merchant/display-flag', data!)  // 更新店铺状态
