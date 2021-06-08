/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:01:06
 * @LastEditTime: 2021-06-08 21:33:19
 * @Description:
 */

import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
export const Layout = () => import('/@/layouts/index.vue')
import { asyncRoute } from './modules'
import redirect from './modules/redirect'
import errorRoute, { NotFoundPage } from './modules/errorRoute'
import { useRouteStore } from '../store/modules/route'
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
  ...asyncRoute,
  ...redirect,
  NotFoundPage,
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

export async function createRoute() {
  const routeStore = useRouteStore()
  let routes = router.getRoutes()
  console.log(routes)
  routes = routes.filter((route) => {
    return !WHITE_ROUTE_LIST.includes(route.name as string)
  })
  console.log(routes)
  await routeStore.setAddRoutes(routes)
}

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}

export default router
