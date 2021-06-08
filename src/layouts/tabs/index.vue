<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-08 09:23:11
 * @LastEditTime: 2021-06-08 19:12:51
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
      <template v-for="tab in tabs" :key="tab.fullPath">
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
                    :disabled="activeKey !== tab.fullPath"
                    @click="reloadPage"
                  >
                    <ReloadOutlined />
                    刷新
                  </a-menu-item>
                  <a-menu-item key="2">
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
              <a-menu-item key="1">
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
    const state = reactive({
      activeKey: route.fullPath,
    })
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
    console.log(tabs.value)

    // 监听路由变化 新增 路由标签
    watch(
      () => route.fullPath,
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

      // 如果 关闭 刚好是当前 的标签
      if (state.activeKey === route.fullPath) {
        const currentRoute = tabs.value[Math.max(0, unref(tabs).length - 1)]
        state.activeKey = currentRoute.fullPath
        router.push(currentRoute)
      }
    }

    //  编辑 tab delete / add
    const editTab = (targetKey, action: string) => {
      console.log(targetKey, action)
      if (action === 'remove') {
        removeTab(
          tabs.value.find((tab) => tab.fullPath === targetKey) as RouteItem
        )
      }
    }

    // 关闭左侧
    const closeLeftTabs = (route) => {
      tabsStore.closeLeftTabs(route)
      state.activeKey = route.fullPath
      router.replace(route.fullPath)
    }

    const closeRightTabs = (route) => {
      tabsStore.closeRightTabs(route)
      state.activeKey = route.fullPath
      router.replace(route.fullPath)
    }

    // 关闭其他
    const closeOtherTabs = (route) => {
      tabsStore.closeOtherTabs(route)
      state.activeKey = route.fullPath
      router.replace(route.fullPath)
    }
    // 关闭全部
    const closeAllTabs = () => {
      tabsStore.closeAllTabs()
      router.replace('/')
    }
    //  此处地方有问题 待定 刷新 之后理应 缓存
    const reloadPage = () => {
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
