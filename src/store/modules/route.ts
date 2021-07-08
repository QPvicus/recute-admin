/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 20:38:46
 * @LastEditTime: 2021-07-08 10:58:32
 * @Description:  路由模块
 */

import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '..'
import StudentRoute from '/@/router/modules/student'
import CompanyRoute from '/@/router/modules/company'
import { asyncRoute } from '/@/router/modules/index'
import router from '/@/router'
import { NotFoundPage } from '/@/router/modules/errorRoute'
interface RouteState {
  menus: RouteRecordRaw[]
  keepAliveComps: string[]
}
export const useRouteStore = defineStore({
  id: 'app-route',
  state: (): RouteState => ({
    menus: [],
    keepAliveComps: [],
  }),
  getters: {
    /**
     *  获取菜单
     * @returns
     */
    getMenus(): any[] {
      return this.menus
    },
    /**
     * 获取缓存组件名字
     * @returns
     */
    getKeepAliveComps(): string[] {
      return this.getKeepAliveComps
    },
  },
  actions: {
    /**
     * 添加路由
     * @param routes
     */
    async setAddRoutes(routes: RouteRecordRaw[]) {
      const commonRoute = ['Home', 'Home-index']
      routes.forEach((route) => {
        if (commonRoute.includes(route.name as string)) {
          this.menus.push(route)
        }
      })
      // 动态添加路由
      const AsyncRoute = [...asyncRoute, ...CompanyRoute, ...StudentRoute]
      AsyncRoute.forEach((item) => {
        router.addRoute(item)
      })
      router.addRoute(NotFoundPage)
      console.log(routes, 'set AddRoutes')
      this.menus = [
        ...this.menus,
        ...asyncRoute,
        ...CompanyRoute,
        ...StudentRoute,
      ]
    },
    /**
     * 添加 缓存组件名字
     * @param comps
     */
    setKeepAliveComps(comps: string[]) {
      this.keepAliveComps = comps
    },
  },
})

export function useRouterStoreWithOut() {
  return useRouteStore(store)
}
