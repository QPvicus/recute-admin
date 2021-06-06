/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 14:57:09
 * @LastEditTime: 2021-06-06 20:26:25
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
const Layout = () => import('/@/layouts/index.vue')
const asyncRoute: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    children: [
      {
        path: '/user/student',
        name: 'Student',
        component: () => import('/@/views/user/College.vue'),
      },
      {
        path: '/user/company',
        name: 'Company',
        component: () => import('/@/views/user/Company.vue'),
      },
    ],
  },
  {
    path: '/post',
    name: 'Post',
    component: Layout,
    redirect: '/post/index',
    children: [
      {
        path: 'index',
        name: 'Post',
        component: () => import('/@/views/post/index.vue'),
      },
    ],
  },
]

export { asyncRoute }
