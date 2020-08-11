import axios from 'axios'
import { message } from 'antd'
import { baseUrl, getHeaders } from './config'
import store from '@/store'
import { clearSessionStorage } from '@/util'
import history from '@/history'


axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = false

axios.interceptors.request.use(
  config => {
    if (!(config.url === '/user/login')) {
      config.headers = getHeaders()
    }
    return config
  },
  error => {
    message.error('请求错误')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    switch (response.status) {
      case 200:
        if (response.data.code === 0) {
          // Promise.resolve(response.data)
          return response.data
        } else {
          message.error(response.data.msg)
          return Promise.reject(response.data)
        }
        break
      case 401:
        message.error('请登录')
        setTimeout(() => {
          store.loginUser.setUser(null)
          clearSessionStorage('loginInfo')
          history.push('/login')
        }, 1000)
        break 
      case 403:
        message.error('暂无该权限')
        break
      case 500:
        message.error('服务端错误')
        break
    }
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default axios