/*
 * @Author: Taylor Swift
 * @Date: 2021-06-08 18:32:14
 * @LastEditTime: 2021-07-08 11:05:28
 * @Description: 路由导航守卫
 */

import NProgress from 'nprogress'
import { isNavigationFailure, Router } from 'vue-router'
import 'nprogress/nprogress.css'
import { useRouterStoreWithOut } from '../store/modules/route'
import { TOKEN } from '/@/store/constants'
import { debounce } from 'lodash-es'
const routeStore = useRouterStoreWithOut()
const allowList = ['Login', 'Error', 'Error-404']
const getMenus = debounce(
  ({ to, from, next, hasRoute, getRoutes }) => {
    routeStore
      .setAddRoutes(getRoutes)
      .then(() => {
        console.log(to.name, 'aaaaa')
        if (allowList.includes(to.name)) return
        if (!hasRoute) {
          const redirect = decodeURIComponent(from.query.redirect || '')
          if (to.path === redirect) {
            next({ ...to, replace: true })
          } else {
            next({ ...to, replace: true })
          }
        }
      })
      .catch(() => next({ path: '/' }))
  },
  1800,
  { leading: true }
)
export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(to, from, next, 'beforeEach')
    NProgress.start()
    // token 路由跳转逻辑
    const token = localStorage.getItem(TOKEN)
    if (token) {
      if (to.name === 'Login') {
        next({ path: '/index' })
        NProgress.done()
      } else {
        const hasRoute = router.hasRoute(to.name!)
        const getRoutes = router.getRoutes()
        if (routeStore.getMenus.length === 0) {
          getMenus({ to, from, next, hasRoute, getRoutes })
        }
        console.log(hasRoute, to.name, 'hasRoute')
        if (allowList.includes(to.name as string) || hasRoute) {
          next()
        }
      }
    } else {
      if (allowList.includes(to.name as string)) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
          replace: true,
        })
      }
    }
  })

  router.afterEach((to, from, failure) => {
    console.log(to, from, failure, 'afterEach')
    document.title = (to.meta?.title as string) || document.title
    // 见官方
    if (isNavigationFailure(failure)) {
      console.log('failed navigation', failure)
    }

    //  进行缓存组件的操作
    const keepAliveComps = routeStore.keepAliveComps
    const currentComponentName = to.matched.find(
      (item) => item.name === to.name
    )?.components.default?.name
    if (
      currentComponentName &&
      !keepAliveComps.includes(currentComponentName) &&
      to.meta?.keepAlive
    ) {
      keepAliveComps.push(currentComponentName)
    } else if (!to.meta?.keepAlive || to.name === 'Redirect') {
      const index = routeStore.keepAliveComps.findIndex(
        (name) => name === currentComponentName
      )
      if (index > -1) {
        keepAliveComps.slice(index, 1)
      }
    }
    //  更新 操作
    routeStore.setKeepAliveComps(keepAliveComps)
    NProgress.done()
  })
}
