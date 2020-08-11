// import * as api from 'api'
import api from '@/api'

const gets:{[key: string]: any} = {}

// 服务商列表
gets.enmu_suppliers = async () => {
  const res = await api.supplier.getSuppliers()
  return res.data.map((item:any) => ({ id: item.merchantCode, name: item.merchantName }))
}

// 物流公司列表
gets.enmu_logistics_companys = async () => {
  const res = await api.order.getLogisticsCompanys()
  return res.data.map((item:any) => ({ id: item.logisticsCompanyCode, name: item.logisticsCompanyName }))
}

// 品牌列表
gets.enmu_brands = async () => {
  const res = await api.brand.getBrands()
  return res.data.map((item:any) => ({ id: item.brandCode, name: item.brandName }))
}

// 商品三级分类列表
gets.enmu_classifies = async () => {
  const res = await api.classify.getClassifyByLevel({ level: 3 })
  const all = res.data.map((item:any) => ({ id: item.categoryCode, name: item.categoryName, displayFlag: item.displayFlag }))
  return all.filter((item:any) => item.displayFlag)
}

type GetsTypes = 'enmu_suppliers' | 'enmu_logistics_companys' | 'enmu_brands' | 'enmu_classifies'

export { gets, GetsTypes }