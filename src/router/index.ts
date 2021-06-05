/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:01:06
 * @LastEditTime: 2021-06-05 14:17:50
 * @Description:
 */


import {createWebHashHistory, createRouter, } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import type { App } from 'vue'

const Layout = () => import('/@/layouts/index.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: () => import('/@/views/index/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  // 自定义路由切换时页面如何滚动
  scrollBehavior: () => ({left: 0, top: 0})
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router


