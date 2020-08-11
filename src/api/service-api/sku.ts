import { get, post, put, del } from '../http'

export const getSpuSkuList = (data: object) => post('/product/sku/list', data) // sku列表

export const batchSkuDown = (data: object) => post('/product/sku/batch-down', data) // 批量下架sku

export const batchSkuOnSale = (data: object) => post('/product/sku/batch-on-sale', data) // 批量上架sku

export const batchSkuOnShow = (data: object) => post('/product/sku/batch-not-display', data) // 批量不再展示sku

export const getSkuListInfo = (data: object) => post('/product/sku/batch-info', data) // 批量查询sku信息

export const getSkuSaleEstimate = (data: object) => post('/product/sku/price-estimate', data) // 批量SKU价格预估

export const batchSkuSetting = (data: object) => post('/product/sku/batch-price-setting', data) // 批量提交sku价格录入