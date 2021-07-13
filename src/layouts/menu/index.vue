<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 13:26:39
 * @LastEditTime: 2021-07-13 16:52:26
 * @Description:
-->

<template>
  <div class="logo flex justify-center items-center whitespace-nowrap">
    <span class="text-white text-xl" v-show="!collapsed">2+1顶岗实习平台</span>
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
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import imgUrl from '/@/assets/zhaoping.svg'
import MenuItem from './MenuItem.vue'
import { useRouteStore } from '/@/store/modules/route'
import { useRoute, useRouter } from 'vue-router'
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
  setup(props) {
    const currentRoute = useRoute()
    const router = useRouter()
    //  获取当前打开的 SubMenu
    const getOpenKeys = () => [currentRoute.matched[0].name]
    const routeStore = useRouteStore()
    const menus = computed(() => routeStore.menus)
    console.log(menus.value, 'menu,value ====')
    const state = reactive({
      selectedKeys: [currentRoute.name],
      openKeys: getOpenKeys(),
    })

    // 监听 colllaspe 折叠状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.selectedKeys = [currentRoute.name]
        state.openKeys = newVal ? [] : getOpenKeys()
      }
    )
    //  监听当前路由的变化 随时更新切换菜单
    watch(
      () => currentRoute.fullPath,
      () => {
        if (props.collapsed) return
        state.selectedKeys = [currentRoute.name]
        state.openKeys = getOpenKeys()
      }
    )

    const handleClick = ({ item, key }) => {
      console.log(item, 'menu')
      if (/http(s)?:/.test(key)) {
        window.open(key)
      } else {
        router.push({ name: key })
      }
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
