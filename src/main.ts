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

	await router.isReady()

	app.mount('#app')
})()
