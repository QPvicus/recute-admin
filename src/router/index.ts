/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:01:06
 * @LastEditTime: 2021-07-13 12:58:18
 * @Description:
 */

import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
export const Layout = () => import('/@/layouts/index.vue')
import redirect from './modules/redirect'
import errorRoute from './modules/errorRoute'
import { setupRouterGuard } from './router-guard'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'icon-dash-board',
    },
    children: [
      {
        path: '/index',
        name: 'Home-index',
        component: () => import('/@/views/index/index.vue'),
        meta: {
          title: '工作台',
          icon: 'icon-workbench',
          keepAlive: true,
        },
      },
    ],
  },
  ...redirect,
  errorRoute,
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  // 自定义路由切换时页面如何滚动
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 白名单
export const WHITE_ROUTE_LIST = ['Login', 'Redirect']

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  setupRouterGuard(router)
}
console.log(router.getRoutes(), 'router getRoutes')

export default router
