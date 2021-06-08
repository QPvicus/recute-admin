/*
 * @Author: Taylor Swift
 * @Date: 2021-06-08 15:37:02
 * @LastEditTime: 2021-06-08 18:02:57
 * @Description:  重定向路由
 */

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/redirect/:path*',
    name: 'Redirect',
    component: import('/@/components/transition/transition.vue'),
    meta: {
      title: '重定向',
      icon: 'Loading3QuartersOutlined',
      hidden: true,
    },
    children: [
      {
        path: '',
        name: 'Redirect',
        component: import('/@/views/redirect/index.vue'),
        meta: {
          title: '重定向',
          hidden: true,
          keepAlive: false,
        },
      },
    ],
  },
]

export default routes
