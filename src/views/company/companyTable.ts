/*
 * @Author: Taylor Swift
 * @Date: 2021-07-08 12:34:49
 * @LastEditTime: 2021-07-13 19:43:51
 * @Description:
 */

export const companyColumn = [
  {
    title: '公司名字',
    width: 180,
    dataIndex: 'company',
    key: 'company',
    fixed: 'left',
  },
  {
    title: '公司类型',
    width: 200,
    dataIndex: 'companytype',
    key: 'companyType',
  },
  { title: '公司电话', width: 200, dataIndex: 'telephone', key: 'telephone' },
  { title: '公司邮箱', width: 200, dataIndex: 'email', key: 'email' },
  {
    title: '公司logo',
    dataIndex: 'icon',
    width: 230,
    key: 'icon',
    slots: { customRender: 'tag' },
  },
  { title: '公司规模', width: 200, dataIndex: 'scale', key: 'scale' },
  {
    title: '操作',
    fixed: 'right',
    key: 'operation',
    width: 100,
    slots: { customRender: 'operation' },
  },
]

export interface CompanyDataItem {
  id: string
  company: string
  companytype: string
  telephone: string
  email: string
  icon: string
  scale: string
  key: string
}
