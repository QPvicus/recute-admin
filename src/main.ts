import { createApp } from 'vue'
import App from './App.vue'
// register windicss
import 'virtual:windi.css'
import '/@/style/index.less'
import { setupStore } from './store'
import router, { setupRouter } from './router'
import { setupAntd } from './AntdPlugin'
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

;(async () => {
  const app = createApp(App)

  setupAntd(app)
  // configure store
  setupStore(app)

  setupRouter(app)
  //  等到路哟初始化完成  挂在元素上面
  await router.isReady()
  console.log(router.getRoutes(), 'aaaaaaaaaaaaaaaaa')
  // 将路由添加到 状态管理李米娜
  // await createRoute()
  app.mount('#app')
})()
