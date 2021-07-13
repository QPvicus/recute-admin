/*
 * @Author: Taylor Swift
 * @Date: 2021-07-13 10:14:48
 * @LastEditTime: 2021-07-13 11:02:45
 * @Description:
 */

export const StudentColumns = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: '25%',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '25%',
    key: 'email',
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    width: '25%',
    key: 'telephone',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    key: 'operation',
  },
]

export interface StudentDataItem {
  id: string
  key: string
  name: string
  email: number
  telephone: string
}

export interface CompanyUserDataItem {
  id: string
  key: string
  name: string
  email: number
  telephone: string
}

export const CompanyUserColumns = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: '25%',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '25%',
    key: 'email',
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    width: '25%',
    key: 'telephone',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    key: 'operation',
  },
]
