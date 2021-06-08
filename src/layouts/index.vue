<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <LayoutMenu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <LayoutHeader v-model:collapsed="collapsed" />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <LayoutTabs />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LayoutMenu from './menu/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutTabs from './tabs/index.vue'
export default defineComponent({
  components: {
    LayoutMenu,
    LayoutHeader,
    LayoutTabs,
  },
  setup() {
    const collapsed = ref<boolean>(false)
    return {
      collapsed,
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
.layout-header {
  padding: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ant-layout {
  overflow: hidden;
}
.layout-content {
  flex: none;
}
.site-layout .site-layout-background {
  background: #fff;
}
</style>
