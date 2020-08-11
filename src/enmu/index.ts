const getName = function (this:any, key: number | string, by:string = 'id') {
  const opt = this.list.find((item:any) => key === item[by])
  return opt ? opt.name : ''
}

export const enmu_brands = {
  list: [
    { id: 1, name: '宾利' },
    { id: 2, name: '宝马' },
    { id: 3, name: '兰博基尼' },
    { id: 4, name: '法拉利' },
    { id: 5, name: '奔驰' },
    { id: 6, name: '劳斯莱斯' }
  ],
  getName
}

export const enmu_order_status = {
  list: [
    { id: 0, name: '待付款', code: 'WaitingForPayment' },
    { id: 2, name: '已付款待发货', code: 'WaitingForShip' },
    { id: 3, name: '已发货', code: 'WaitingForReceive' },
    { id: 4, name: '已完成', code: 'Finished' },
    { id: 5, name: '已取消', code: 'Canceled' }
  ],
  getName
}

export const enmu_pay_types = {
  list: [
    { id: 0, name: '微信', code: 'Weixin' },
    { id: 1, name: '支付宝', code: 'Zhifubao' }
  ],
  getName
}

export const enmu_sku_status = {
  list: [
    { id: 1, name: '待完善', code: 'PrepareComplete' },
    { id: 2, name: '已完善', code: 'Complete' },
    { id: 3, name: '已上架', code: 'OnSale' },
    { id: 4, name: '上架不可售', code: 'NotForSale' },
    { id: 5, name: '已下架', code: 'Down' },
    { id: 6, name: '不再显示', code: 'NotDisplay' },
  ],
  getName
}

export const enmu_spu_status = {
  list: [
    { id: 1, name: '待完善' },
    { id: 2, name: '已完善' },
    { id: 3, name: '已上架' },
    { id: 4, name: '已下架' }
  ],
  getName
}