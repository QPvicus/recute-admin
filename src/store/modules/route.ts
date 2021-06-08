/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 20:38:46
 * @LastEditTime: 2021-06-08 21:31:36
 * @Description:  路由模块
 */

import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '..'
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
    getMenus(): any[] {
      return this.menus
    },
    getKeepAliveComps(): string[] {
      return this.getKeepAliveComps
    },
  },
  actions: {
    setAddRoutes(routes: RouteRecordRaw[]) {
      this.menus = [...this.menus, ...routes]
    },
    setKeepAliveComps(comps: string[]) {
      this.keepAliveComps = comps
    },
  },
})

export function useRouterStoreWithOut() {
  return useRouteStore(store)
}
