/*
 * @Author: Taylor Swift
 * @Date: 2021-06-27 15:18:22
 * @LastEditTime: 2021-06-27 15:36:34
 * @Description:
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/student',
    name: 'StudentManager',
    redirect: '/student/view',
    component: () => import('/@/layouts/index.vue'),
    meta: {
      title: '学生管理',
      icon: 'icon-Student',
      role: ['admin'],
    },
    children: [
      {
        path: '/student/view',
        name: 'StudentManagerView',
        component: () => import('/@/views/student/view.vue'),
        meta: {
          title: '学生信息',
          icon: 'icon-info',
          keepAlive: true,
          role: ['admin'],
        },
      },
      {
        path: '/student/edit',
        name: 'StudentManagerEdit',
        component: () => import('/@/views/student/edit.vue'),
        meta: {
          title: '学生编辑',
          icon: 'icon-edit',
          keepAlive: true,
          role: ['admin'],
        },
      },
    ],
  },
]

export default routes
