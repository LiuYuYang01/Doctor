import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { showToast } from 'vant'
import type { Response } from '@/types/Response'

// 创建 axios 实例
const instance = axios.create({
    // 项目API根路径
    baseURL: "https://consult-api.itheima.net",
    // 请求超时的时间
    timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(
    (config) => {
        const store = useUserStore()

        // 如果有token就把赋值给请求头
        if (store.user?.token) {
            config.headers['Authorization'] = `Bearer ${store.user?.token}`
        }

        return config
    },
    (err) => {
        Promise.reject(err)
    }
)

// 响应拦截
instance.interceptors.response.use(
    res => {
        // 只要code不等于10000,就相当于响应失败
        if (res.data?.code !== 10000) {
            showToast(res.data?.message || "未知错误")

            Promise.reject(res.data)
        }

        return res.data
    },
    err => {
        // 如果401相当于认证失败
        if (err.response.status === 401) {
            const store = useUserStore()

            // 删除用户信息
            store.delUser()

            // 跳转到登录页
            router.push({
                path: "/login",
                query: { returnUrl: router.currentRoute.value.fullPath }
            })
        }

        return Promise.reject(err)
    }
)

// 如果是GET传参就自动识别为query，POST为data
const Request = <T>(method: string, url: string, reqParams?: object) => {
    return instance.request<T, Response<T>>({
        method, url,
        [method.toLocaleUpperCase() === "GET" ? "parame" : "data"]: reqParams
    })
}

export default Request