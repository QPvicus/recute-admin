/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 14:57:22
 * @LastEditTime: 2021-06-06 16:59:36
 * @Description:
 */

import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '..'

const NotFoundPage: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'NotFoundPage',
  redirect: '/error/404',
  component: () => import('/@/views/error/404.vue'),
}

export default errorRoute
