import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'

const userStore = defineStore('user', () => {
    const user = ref<User>("hello")

    // 修改用户信息
    const updateUser = (data: User) => {
        user.value = data
    }

    // 清空用户，退出后使用
    const delUser = () => {
        user.value = undefined
    }

    return { user, updateUser, delUser }
}, { persist: true })

export default userStore