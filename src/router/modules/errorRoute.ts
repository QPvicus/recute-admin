/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 14:57:22
 * @LastEditTime: 2021-06-27 10:26:00
 * @Description:
 */

import type { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '/@/components/transition'

export const NotFoundPage: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'NotFoundPage',
  redirect: '/error/404',
  component: () => import('/@/views/error/404.vue'),
}

const errorRoute: RouteRecordRaw = {
  path: '/error',
  name: 'Error',
  redirect: '/error/404',
  component: RouterTransition,
  meta: {
    title: '错误页',
    icon: 'EditOutlined',
    hidden: true,
  },
  children: [
    {
      path: '404',
      name: 'Error-404',
      component: () => import('/@/views/error/404.vue'),
      meta: {
        title: '404',
        icon: 'UserOutlined',
      },
    },
  ],
}

export default errorRoute
