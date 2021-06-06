/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 20:38:46
 * @LastEditTime: 2021-06-06 20:55:17
 * @Description:
 */

import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '..'
interface RouteState {
  menus: RouteRecordRaw[]
}
export const useRouteStore = defineStore({
  id: 'app-route',
  state: (): RouteState => ({
    menus: [],
  }),
  getters: {
    getMenus(): any[] {
      return this.menus
    },
  },
  actions: {
    setAddRoutes(routes: RouteRecordRaw[]) {
      this.menus = [...this.menus, ...routes]
    },
  },
})

export function useRouterStoreWithOut() {
  return useRouteStore(store)
}
