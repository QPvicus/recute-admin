/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:17:36
 * @LastEditTime: 2021-07-08 14:36:18
 * @Description: 按需导入 Antd 组件
 */

import type { App } from 'vue'
import {
  Button,
  Layout,
  Form,
  Input,
  Checkbox,
  Col,
  Row,
  Divider,
  Menu,
  Breadcrumb,
  Dropdown,
  Avatar,
  Tooltip,
  Tabs,
  Card,
  Result,
  Modal,
  Table,
  Image,
} from 'ant-design-vue'
import popconfirm from 'ant-design-vue/lib/popconfirm'
const Components = [
  Button,
  Layout,
  Form,
  Input,
  Checkbox,
  Col,
  Row,
  Divider,
  Menu,
  Breadcrumb,
  Dropdown,
  Avatar,
  Tooltip,
  Tabs,
  Card,
  Result,
  Modal,
  Table,
  Image,
  popconfirm,
]
export function setupAntd(app: App) {
  Components.forEach((component) => {
    app.use(component)
  })
}
