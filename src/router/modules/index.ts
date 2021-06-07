/*
 * @Author: Taylor Swift
 * @Date: 2021-06-06 14:57:09
 * @LastEditTime: 2021-06-07 14:04:39
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
const Layout = () => import('/@/layouts/index.vue')
const asyncRoute: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: {
      title: '用户中心',
      icon: 'icon-user',
    },
    children: [
      {
        path: '/user/student',
        name: 'Student',
        component: () => import('/@/views/user/College.vue'),
        meta: {
          title: '大学生',
          icon: 'icon-Student',
        },
      },
      {
        path: '/user/company',
        name: 'Company',
        component: () => import('/@/views/user/Company.vue'),
        meta: {
          title: '公司',
          icon: 'icon-company',
        },
      },
    ],
  },
  {
    path: '/post',
    name: 'Post',
    component: Layout,
    redirect: '/post/index',
    meta: {
      title: '职位',
      icon: 'icon-zhiweisvg',
    },
    children: [
      {
        path: 'index',
        name: 'Post',
        component: () => import('/@/views/post/index.vue'),
        meta: {
          title: '职位管理',
          icon: 'icon-zhiweisvg',
        },
      },
    ],
  },
]

export { asyncRoute }
