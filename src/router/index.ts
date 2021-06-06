/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:01:06
 * @LastEditTime: 2021-06-06 21:09:16
 * @Description:
 */

import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
export const Layout = () => import('/@/layouts/index.vue')
import { asyncRoute } from './modules'
import { useRouteStore } from '../store/modules/route'
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
    children: [
      {
        path: '/index',
        name: 'Home',
        component: () => import('/@/views/index/index.vue'),
      },
    ],
  },
  ...asyncRoute,
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  // 自定义路由切换时页面如何滚动
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const WHITE_ROUTE_LIST = ['Login']

export async function createRoute() {
  const routeStore = useRouteStore()
  let routes = router.getRoutes()
  routes = routes.filter((route) => {
    return !WHITE_ROUTE_LIST.includes(route.name as string)
  })
  await routeStore.setAddRoutes(routes)
}

export function setupRouter(app: App) {
  app.use(router)
}

export default router
