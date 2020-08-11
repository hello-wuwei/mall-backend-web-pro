let homePage = '/spu-manage'

let list = [
  {
    key: '1',
    name: '商品管理',
    icon: 'user',
    children: [
      {
        key: '/spu-manage',
        name: 'SPU管理'
      },
      {
        key: '/sku-manage',
        name: 'SKU管理'
      },
      {
        key: '/sku-price-manage',
        name: '价格管理'
      },
      {
        key: '/classify-manage',
        name: '分类管理'
      },
      {
        key: '/brand-manage',
        name: '品牌管理'
      },
      {
        key: '/supplier-manage',
        name: '供应商管理'
      }
    ]
  },
  {
    key: '2',
    name: '订单管理',
    icon: 'team',
    children: [
      {
        key: '/order-list',
        name: '订单列表'
      }
    ]
  }
]

// const APP_ENV = process.env.APP_ENV
// if (APP_ENV === 'development') {
//   list = [
//     ...list
//   ]
// } else {
//   // homePage = '/order-list'
// }

export { list, homePage }