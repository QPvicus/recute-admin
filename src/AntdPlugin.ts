/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:17:36
 * @LastEditTime: 2021-07-13 20:36:42
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
  Popconfirm,
  Tag,
  Descriptions,
} from 'ant-design-vue'
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
  Popconfirm,
  Tag,
  Descriptions,
]
export function setupAntd(app: App) {
  Components.forEach((component) => {
    app.use(component)
  })
}
