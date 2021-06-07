/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:06:54
 * @LastEditTime: 2021-06-07 08:57:52
 * @Description:  封装状态管理模式
 */

import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}

export { store }
