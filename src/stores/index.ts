import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

export default createPinia().use(persist)

export * from './modules/User'