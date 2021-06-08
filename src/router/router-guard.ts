/*
 * @Author: Taylor Swift
 * @Date: 2021-06-08 18:32:14
 * @LastEditTime: 2021-06-08 19:46:02
 * @Description:
 */

import NProgress from 'nprogress'
import type { Router } from 'vue-router'
import 'nprogress/nprogress.css'
export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(to, from, next, 'beforeEach')
    NProgress.start()
    next()
  })

  router.afterEach((to, from, failure) => {
    console.log(to, from, failure, 'afterEach')
    NProgress.done()
  })
}
