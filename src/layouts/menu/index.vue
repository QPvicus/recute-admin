<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 13:26:39
 * @LastEditTime: 2021-06-07 15:52:06
 * @Description:
-->

<template>
  <div class="logo flex justify-center items-center whitespace-nowrap">
    <img :src="imgUrl" alt="" />
    <span class="text-white text-xl" v-show="!collapsed">大学生招聘</span>
  </div>
  <a-menu
    theme="dark"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    @click="handleClick"
  >
    <template v-for="item in menus" :key="item.name">
      <MenuItem :menu-info="item" />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import imgUrl from '/@/assets/zhaoping.svg'
import MenuItem from './MenuItem.vue'
import { useRouteStore } from '/@/store/modules/route'
import { useRoute } from 'vue-router'
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
    const currentRoute = useRoute()
    console.log(currentRoute)
    const getOpenKeys = () => [currentRoute.matched[1].name]
    const routeStore = useRouteStore()
    const menus = computed(() => routeStore.menus)
    console.log(menus.value)
    const state = reactive({
      selectedKeys: getOpenKeys(),
      openKeys: [currentRoute.name],
    })
    const handleClick = ({ item, key, keyPath }) => {
      console.log(item, key, keyPath)
    }
    return {
      ...toRefs(state),
      imgUrl,
      menus,
      handleClick,
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
