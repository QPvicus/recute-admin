<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 21:15:36
 * @LastEditTime: 2021-06-07 09:15:50
 * @Description:
-->

<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu v-if="menuInfo.children?.length" :key="menuInfo.name">
      <template #title> </template>
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'MenuItem',
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    console.log(props.menuInfo)
  },
})
</script>
