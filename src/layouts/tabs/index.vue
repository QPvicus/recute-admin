<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-08 09:23:11
 * @LastEditTime: 2021-07-13 21:02:56
 * @Description:
-->

<template>
  <div class="tabs-view">
    <a-tabs
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @change="handleChange"
      @edit="editTab"
    >
      <template v-for="tab in tabs" :key="tab.path">
        <a-tab-pane>
          <template #tab>
            <a-dropdown :trigger="['contextmenu']">
              <div style="display: inline-block">
                {{ tab.meta?.title }}
              </div>
              <template #overlay>
                <a-menu style="user-select: none">
                  <a-menu-item
                    key="1"
                    :disabled="activeKey !== tab.path"
                    @click="reloadPage"
                  >
                    <ReloadOutlined />
                    刷新
                  </a-menu-item>
                  <a-menu-item key="2" @click="removeTab(tab)">
                    <CloseOutlined />
                    关闭
                  </a-menu-item>
                  <a-menu-item key="3" @click="closeLeftTabs(tab)">
                    <VerticalLeftOutlined />
                    关闭左侧
                  </a-menu-item>
                  <a-menu-item key="4" @click="closeRightTabs(tab)">
                    <VerticalRightOutlined />
                    关闭右侧
                  </a-menu-item>
                  <a-menu-item key="5" @click="closeOtherTabs(tab)">
                    <ColumnWidthOutlined />
                    关闭两侧
                  </a-menu-item>
                  <a-menu-item key="6" @click="closeAllTabs">
                    <DashOutlined />
                    全部关闭
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tab-pane>
      </template>
      <template #tabBarExtraContent>
        <a-dropdown>
          <a>
            <DownOutlined :style="{ fontSize: '20px' }" />
          </a>
          <template #overlay>
            <a-menu style="user-select: none">
              <a-menu-item key="1" @click="reloadPage">
                <ReloadOutlined />
                刷新
              </a-menu-item>
              <a-menu-item key="2" @click="removeTab(route)">
                <CloseOutlined />
                关闭
              </a-menu-item>
              <a-menu-item key="5" @click="closeOtherTabs(route)">
                <ColumnWidthOutlined />
                关闭两侧
              </a-menu-item>
              <a-menu-item key="6" @click="closeAllTabs">
                <DashOutlined />
                全部关闭
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
    <div class="view-content">
      <a-card>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouteItem, useTabsStore } from '/@/store/modules/tabs'
import {
  ReloadOutlined,
  CloseOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  ColumnWidthOutlined,
  DashOutlined,
  DownOutlined,
} from '@ant-design/icons-vue'
import { TABS_ROUTES } from '/@/store/constants'
import { WHITE_ROUTE_LIST } from '/@/router'
import { message } from 'ant-design-vue'
import { useRouteStore } from '/@/store/modules/route'
export default defineComponent({
  name: 'TabsPage',
  components: {
    ReloadOutlined,
    CloseOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
    ColumnWidthOutlined,
    DashOutlined,
    DownOutlined,
  },
  setup() {
    const route = useRoute()
    const tabsStore = useTabsStore()
    const router = useRouter()
    const routeStore = useRouteStore()
    const state = reactive({
      activeKey: route.path,
    })
    console.log(state.activeKey, 'activeKey')
    const getSimpleRoute = (route): RouteItem => {
      const { fullPath, hash, meta, matched, name, params, path, query } = route
      return { fullPath, hash, meta, matched, name, params, path, query }
    }
    let routes: RouteItem[] = []
    try {
      const routeStorage = localStorage.getItem(TABS_ROUTES)
      routes = routeStorage ? JSON.parse(routeStorage) : [getSimpleRoute(route)]
    } catch (err) {
      routes = [getSimpleRoute(route)]
    }
    tabsStore.initTabs(routes)
    // 标签页列表
    const tabs = computed(() => tabsStore.tabs)
    console.log('tabs view', tabs.value)
    // 可能  路由是未找到页  标签页理应不包含未找到的标签
    console.log(router.hasRoute('Error-404'))
    watch(
      () => route.path,
      () => {
        const notFoundRoute: string[] = []
        tabs.value.forEach((tab) => {
          if (!router.hasRoute(tab.name)) {
            notFoundRoute.push(tab.name)
          }
        })
        if (notFoundRoute.length) {
          const newTabs = tabs.value.filter(
            (tab) => !notFoundRoute.includes(tab.name)
          ) as RouteItem[]
          tabsStore.initTabs(newTabs)
        }
      }
    )

    // 监听路由变化 新增 路由标签
    watch(
      () => route.path,
      (to) => {
        // console.log(to, from)
        if (WHITE_ROUTE_LIST.includes(route.name as string)) return
        state.activeKey = to
        tabsStore.addTabs(getSimpleRoute(route))
      },
      {
        immediate: true,
      }
    )

    //  刷新 页面 移除缓存组件
    const deleletKeepAliveCompName = () => {
      console.log('name', routeStore.keepAliveComps)
      if (route.meta.keepAlive) {
        const name = router.currentRoute.value.matched.find(
          (item) => item.name === route.name
        )?.components.default?.name
        if (name) {
          routeStore.keepAliveComps.filter((compName) => compName !== name)
        }
      }
    }

    //  浏览器刷新或者关闭之前 对标签做缓存
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(TABS_ROUTES, JSON.stringify(unref(tabs)))
    })
    // 点击标签的回调
    const handleChange = (activeKey) => {
      state.activeKey = activeKey
      router.push(activeKey)
    }

    //  关闭当前页面
    const removeTab = (route) => {
      if (tabs.value.length === 1) {
        return message.warning('该标签是最后一个了!')
      }
      tabsStore.closeCurrentTab(route)
      //  关闭页面 就要移除缓存组件
      deleletKeepAliveCompName()
      // 如果 关闭 刚好是当前 的标签
      if (state.activeKey === route.path) {
        const currentRoute = tabs.value[Math.max(0, unref(tabs).length - 1)]
        state.activeKey = currentRoute.path
        router.push(currentRoute)
      }
    }

    //  编辑 tab delete / add
    const editTab = (targetKey, action: string) => {
      console.log(targetKey, action)
      if (action === 'remove') {
        removeTab(tabs.value.find((tab) => tab.path === targetKey) as RouteItem)
      }
    }

    // 关闭左侧
    const closeLeftTabs = (route) => {
      tabsStore.closeLeftTabs(route)
      state.activeKey = route.path
      router.replace(route.fullPath)
    }

    const closeRightTabs = (route) => {
      tabsStore.closeRightTabs(route)
      state.activeKey = route.path
      router.replace(route.fullPath)
    }

    // 关闭其他
    const closeOtherTabs = (route) => {
      tabsStore.closeOtherTabs(route)
      state.activeKey = route.path
      router.replace(route.fullPath)
    }
    // 关闭全部
    const closeAllTabs = () => {
      tabsStore.closeAllTabs()
      router.replace('/')
    }
    //  此处地方有问题 待定 刷新 之后理应 缓存
    const reloadPage = () => {
      deleletKeepAliveCompName()
      console.log('reloadPage')
      router.push({
        path: '/redirect' + unref(route).fullPath,
      })
    }

    return {
      tabs,
      route,
      handleChange,
      removeTab,
      editTab,
      reloadPage,
      closeLeftTabs,
      closeRightTabs,
      closeOtherTabs,
      closeAllTabs,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="less" scoped>
.tabs-view {
  border-top: 1px solid #ccc;
}
.view-content {
  padding: 20px 14px 0;
  height: calc(100vh - 110px);
  overflow: auto;
}
:deep(.ant-tabs-bar) {
  margin: 0;
  padding: 2px 20px 0 10px;
  background: #fff;
  user-select: none;
}
</style>
