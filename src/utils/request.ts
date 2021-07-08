/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 14:18:50
 * @LastEditTime: 2021-07-08 13:06:58
 * @Description:
 */

import axios from 'axios'
import { useUserStoreWithOut } from '/@/store/modules/user'

/**
 *  @description 项目初始化
 */
const instance = axios.create({
  baseURL: 'http://47.98.44.98:5253/Recruit',
})

/**
 * @description 请求拦截器  请求之前携带 token
 *
 */

const store = useUserStoreWithOut()
instance.interceptors.request.use(
  (config) => {
    const { token } = store
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description 响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      //  重定向 登录页面
    } else if (error.response.status === 500) {
      // 服务器出错
    }

    return Promise.reject(error)
  }
)

export default instance
