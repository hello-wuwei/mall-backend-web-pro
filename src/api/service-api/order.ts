import { get, post, put, del } from '../http'

export const getOrders = (data: object) => post('/order/order-list', data)

export const getOrderDetail = (data: object) => get('/order/order-detail', data)

export const getLogisticsCompanys = () => get('/logistics/logistics-company-list')  // 物流公司列表

export const sendGoods = (data: object) => post('/order/shipment/action', data)  // 发货