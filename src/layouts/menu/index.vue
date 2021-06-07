<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 13:26:39
 * @LastEditTime: 2021-06-07 09:08:15
 * @Description:
-->

<template>
  <div class="logo flex justify-center items-center whitespace-nowrap">
    <img :src="imgUrl" alt="" />
    <span class="text-white text-xl" v-show="!collapsed">大学生招聘</span>
    <a-menu
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <template v-for="item in menus" :key="item.name">
        <MenuItem :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import imgUrl from '/@/assets/zhaoping.svg'
import MenuItem from './MenuItem.vue'

import { useRouteStore } from '/@/store/modules/route'
export default defineComponent({
  name: 'LayoutMenu',
  components: {
    MenuItem,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const routeStore = useRouteStore()
    const menus = computed(() => routeStore.menus)
    const state = reactive({
      selectedKeys: ['1'],
      openKeys: [],
    })
    return {
      ...toRefs(state),
      imgUrl,
      menus,
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
