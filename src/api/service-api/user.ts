// 供应商相关接口
import { get, post, put, del } from '../http'

export const loginIn = (data?:any) => post('/user/login', data) // 登录

export const loginOut = (data?:any) => get('/user/logout', data)  // 登出