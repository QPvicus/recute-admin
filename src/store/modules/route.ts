/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 20:38:46
 * @LastEditTime: 2021-06-09 11:12:47
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
    setAddRoutes(routes: RouteRecordRaw[]) {
      this.menus = [...this.menus, ...routes]
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
