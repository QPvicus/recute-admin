<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 14:41:39
 * @LastEditTime: 2021-06-09 13:19:36
 * @Description:
-->

<template>
  <div class="left-header">
    <span class="trigger" @click="() => $emit('update:collapsed', !collapsed)">
      <component :is="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
    </span>
    <a-breadcrumb>
      <template v-for="routeItem in route.matched" :key="routeItem.name">
        <a-breadcrumb-item>
          <a>{{ routeItem.meta.title }}</a>
          <template #overlay>
            <a-menu v-if="routeItem.children.length">
              <template v-for="item in routeItem.children">
                <a-menu-item v-if="!item.meta?.hidden" :key="item.name">
                  <router-link :to="{ name: item.name }">
                    {{ item.meta?.title }}
                  </router-link>
                </a-menu-item>
              </template>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>

  <div class="right-header">
    <template v-for="item in iconList" :key="item.title">
      <a-tooltip placement="bottom">
        <template #title>{{ item.title }}</template>
        <component
          style="font-size: 20px"
          :is="item.icon"
          v-on="item.eventObj || {}"
        />
      </a-tooltip>
    </template>
    <component :is="fullscreenIcon" @click="toggleFullScreen" />
    <a-dropdown>
      <a-avatar>admin</a-avatar>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <a href="javascript:;">个人中心</a>
          </a-menu-item>
          <a-menu-item key="2" @click="logout">
            <a><PoweroffOutlined /> 退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, reactive, toRefs } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import {
  PoweroffOutlined,
  GithubOutlined,
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { TABS_ROUTES, TOKEN } from '/@/store/constants'
export default defineComponent({
  name: 'LayoutHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined,
    SearchOutlined,
    GithubOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    ExclamationCircleOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      fullscreenIcon: 'FullscreenOutlined',
    })
    const iconList = [
      {
        icon: 'SearchOutlined',
        title: '搜索',
      },
      {
        icon: 'GithubOutlined',
        title: 'Github链接地址',
        eventObj: {
          click: () => window.open('https://github.com/QPvicus'),
        },
      },
    ]
    const toggleFullScreenIcon = () => {
      state.fullscreenIcon =
        document.fullscreenElement !== null
          ? 'FullscreenExitOutlined'
          : 'FullscreenOutlined'
    }

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
    document.addEventListener('fullscreenchange', toggleFullScreenIcon)

    const logout = () => {
      Modal.confirm({
        title: '你确定要退出登录吗?',
        icon: createVNode(ExclamationCircleOutlined),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          Promise.resolve().then(() => {
            localStorage.removeItem(TABS_ROUTES)
            localStorage.removeItem(TOKEN)
            router.replace({
              path: '/login',
              query: {
                redirect: route.fullPath,
              },
            })
          })
        },
      })
    }
    return {
      ...toRefs(state),
      route,
      toggleFullScreen,
      iconList,
      logout,
    }
  },
})
</script>

<style lang="less" scoped>
.left-header {
  display: flex;
  align-items: center;
}
.right-header {
  display: flex;
  align-items: center;
  > * {
    margin-right: 20px;
    cursor: pointer;
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
</style>
