/*
 * @Author: Taylor Swift
 * @Date: 2021-06-27 10:26:28
 * @LastEditTime: 2021-06-27 15:16:32
 * @Description:
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/companyManager',
    name: 'CompanyManager',
    redirect: '/companyManager/view',
    component: () => import('/@/layouts/index.vue'),
    meta: {
      title: '公司管理',
      icon: 'icon-gongsi',
    },
    children: [
      {
        path: '/companyManager/view',
        name: 'CompanyManagerView',
        component: () => import('/@/views/company/view.vue'),
        meta: {
          keepAlive: true,
          title: '公司信息',
          icon: 'icon-info',
        },
      },
      {
        path: '/companyManager/edit',
        name: 'CompanyManagerEdit',
        component: () => import('/@/views/company/edit.vue'),
        meta: {
          keepAlive: true,
          title: '公司编辑',
          icon: 'icon-edit',
        },
      },
    ],
  },
]

export default routes
