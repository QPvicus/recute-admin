<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 21:15:36
 * @LastEditTime: 2021-06-07 15:40:00
 * @Description:
-->

<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu
      v-if="menuInfo.children?.length"
      :key="menuInfo.name"
      v-bind="$attrs"
    >
      <template #title>
        <span>
          <Iconfont style="color: aliceblue" :type="menuInfo.meta.icon" />
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <Iconfont style="color: aliceblue" :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <MenuItem :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-sub-menu>
    <!-- <a-menu-item v-else :key="menuInfo.name">
      <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" />
      <span>{{ menuInfo.meta.title }}</span>
    </a-menu-item> -->
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { Iconfont } from '/@/components/iconfont'
export default defineComponent({
  name: 'MenuItem',
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    Iconfont,
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
