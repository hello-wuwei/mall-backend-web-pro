import { get, post, put, del } from '../http'

export const getSpus = (data: object) => post('/product/spu/list', data) // 获取spu列表

export const addSpu = (data: object) => post('/product/spu/insert', data) // 添加spu

export const updateSpu = (data: object) => post('/product/spu/update', data) // 更新spu

export const getSpu = (data: object) => get('/product/spu/echo', data) // 获取spu详情

export const addSpuSaleProperty = (data: object) => post('/product/spu/add/sale-property', data) // 添加SPU销售属性

export const getSpuSaleProperty = (data: object) => get('/product/spu/property/echo', data) // 回显SPU销售属性

export const getSkuAllList = (data: object) => get('/product/spu/add/sale-property', data) // 笛卡尔积

export const addSkuBatch = (data: object) => post('/product/sku/insert-batch', data) // 添加sku批量

export const addSkuTree = (data: object) => get('/product/sku/property/echo', data) // 获取sku tree

export const addSpuSku = (data: object) => post('/product/sku/insert', data) // 添加商品sku

export const onBatchSale = (data: object) => post('/product/spu/sale', data) // 上下架spu