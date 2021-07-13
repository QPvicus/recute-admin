/*
 * @Author: Taylor Swift
 * @Date: 2021-07-13 16:59:57
 * @LastEditTime: 2021-07-13 20:06:21
 * @Description:
 */

export const PostColumns = [
  {
    title: '职位名称',
    width: 180,
    dataIndex: 'positionName',
    key: 'company',
    fixed: 'left',
  },
  {
    title: '职位类别',
    width: 260,
    dataIndex: 'classify',
    key: 'classify',
    slots: { customRender: 'classify' },
  },
  {
    title: '公司名称',
    width: 200,
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: '职位薪资',
    width: 150,
    dataIndex: 'remuneration',
    key: 'remuneration',
  },
  { title: '学历要求', width: 150, dataIndex: 'education', key: 'education' },
  { title: '招聘人数', width: 100, dataIndex: 'people', key: 'people' },
  {
    title: '职位福利',
    dataIndex: 'safeguard',
    width: 250,
    key: 'safeguard',
    slots: { customRender: 'safeguard' },
  },
  {
    title: '操作',
    fixed: 'right',
    key: 'operation',
    width: 200,
    slots: { customRender: 'operation' },
  },
]

export interface JobDataItem {
  id: string
  positionName: string
  classify: string
  people: string
  remuneration: string
  education: string
  safeguard: string
  key: string
}
