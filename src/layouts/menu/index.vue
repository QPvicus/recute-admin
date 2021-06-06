<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 13:26:39
 * @LastEditTime: 2021-06-06 21:08:41
 * @Description:
-->

<template>
  <div class="logo flex justify-center items-center whitespace-nowrap">
    <img :src="imgUrl" alt="" />
    <span class="text-white text-xl" v-show="!collapsed">大学生招聘</span>
  </div>
  <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
    <a-menu-item key="1">
      <user-outlined />
      <span>nav 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <video-camera-outlined />
      <span>nav 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <upload-outlined />
      <span>nav 3</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import imgUrl from '/@/assets/zhaoping.svg'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { useRouteStore } from '/@/store/modules/route'
export default defineComponent({
  name: 'LayoutMenu',
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const routeStore = useRouteStore()
    console.log(routeStore.menus)
    const state = reactive({
      selectedKeys: ['1'],
      openKeys: [],
    })
    return {
      ...toRefs(state),
      imgUrl,
    }
  },
})
</script>

<style lang="less" scoped>
.logo {
  height: 64px;
  img {
    width: 48px;
    height: 48px;
  }
}
</style>
