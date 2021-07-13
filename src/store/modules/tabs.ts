/*
 * @Author: Taylor Swift
 * @Date: 2021-06-08 09:59:31
 * @LastEditTime: 2021-07-13 21:02:36
 * @Description: 对 多标签页  进行 缓存
 */

import { defineStore } from 'pinia'
import { store } from '/@/store'
import type { RouteLocationNormalized } from 'vue-router'
import { WHITE_ROUTE_LIST } from '/@/router'
import { TABS_ROUTES } from '../constants'

//  让 fullPath name 成为必选
export type RouteItem = Partial<RouteLocationNormalized> & {
  path: string
  name: string
}
interface TabsState {
  tabs: RouteItem[]
}

export const useTabsStore = defineStore({
  id: 'Tabs',
  state: (): TabsState => ({
    tabs: [],
  }),
  actions: {
    /**
     *  初始化 标签路由
     * @param routes
     */
    initTabs(routes: RouteItem[]) {
      this.tabs = routes
    },
    /**
     *  添加 标签路由
     * @param route
     * @returns
     */
    addTabs(route: RouteItem) {
      if (WHITE_ROUTE_LIST.includes(route.name)) return false
      const isExists = this.tabs.some((tab) => tab.path === route.path)
      if (!isExists) {
        this.tabs.push(route)
      }
      return true
    },
    /**
     *  删除当前 标签路由
     * @param route
     */
    closeCurrentTab(route: RouteItem) {
      const index = this.tabs.findIndex((tab) => tab.path === route.path)
      this.tabs.splice(index, 1)
    },
    /**
     *  关闭左边的标签
     * @param route
     */
    closeLeftTabs(route: RouteItem) {
      const index = this.tabs.findIndex((tab) => tab.path === route.path)
      this.tabs.splice(0, index)
    },
    /**
     * 关闭 右边
     * @param route
     */
    closeRightTabs(route: RouteItem) {
      const index = this.tabs.findIndex((tab) => tab.path === route.path)
      this.tabs.splice(index + 1)
    },
    /**
     * 删除其他全部标签
     * @param route
     */
    closeOtherTabs(route: RouteItem) {
      this.tabs = this.tabs.filter((tab) => tab.path === route.path)
    },
    /**
     * 清楚全部标签以及 本地缓存的标签
     */
    closeAllTabs() {
      this.tabs = []
      localStorage.removeItem(TABS_ROUTES)
    },
  },
})

export const useTabsStoreWithOut = () => {
  return useTabsStore(store)
}
