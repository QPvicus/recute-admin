<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <LayoutMenu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="handleCollapseToggle"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="handleCollapseToggle"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LayoutMenu from './menu/index.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LayoutMenu,
  },
  setup() {
    const collapsed = ref<boolean>(false)
    const handleCollapseToggle = () => {
      collapsed.value = !collapsed.value
    }
    return {
      collapsed,
      handleCollapseToggle,
    }
  },
})
</script>
<style lang="less" scoped>
.layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
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

.site-layout .site-layout-background {
  background: #fff;
}
</style>
