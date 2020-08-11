import { useState } from 'react'
import { onFilter, clearEmptyValue } from '@/util'

export const useParams = (defaultParams?:object) => {
  const [ filters, setFilters ] = useState<any>({ size: 10, page: 1, ...defaultParams })
  const setParams = (filter:object) => {
    const data = onFilter(filters, filter)
    setFilters(clearEmptyValue(data))
  }

  return {
    params: filters,
    setParams
  }
}
