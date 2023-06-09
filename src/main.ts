import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import pinia from '@/stores/index'

// 引入vant组件库样式
import 'vant/lib/index.css'
// 自定义的样式
import '@/styles/main.scss'

import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
