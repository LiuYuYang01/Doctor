import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'

export const useUserStore = defineStore('user', () => {
    const user = ref<any>()

    // 修改用户信息
    const setUser = (data: User) => {
        console.log(data.data,444);
        
        user.value = data.data
    }

    // 清空用户，退出后使用
    const delUser = () => {
        user.value = undefined
    }

    return { user, setUser, delUser }
}, { persist: true })