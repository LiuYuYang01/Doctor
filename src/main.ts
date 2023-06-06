import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 引入vant组件库样式
import 'vant/lib/index.css'
// 自定义的样式
import '@/styles/main.scss'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
