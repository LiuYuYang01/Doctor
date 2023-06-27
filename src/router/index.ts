import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress配置信息
NProgress.configure({
  // 取消圆形加载图标
  showSpinner: false
})

// 路由配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/Patient.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: "/room",
      component: () => import("@/views/Room/index.vue"),
      meta: { title: '问诊室' },
      beforeEnter(to) {
        if (to.query.payResult === "false") return "user/consult"
      }
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

// 访问权限控制
router.beforeEach(to => {
  // 开启进度条
  NProgress.start()

  // 处理页面标题
  document.title = `优医问诊 - ${to.meta.title || ''}`

  // 用户仓库
  const store = useUserStore()

  // 白名单：不需要登录就能访问的页面
  const wihteList = ["/login"]

  // 如果没有token就意味着没有登录 并且 在没有登录情况下会自动跳转到登录页
  if (!store.user?.token && !wihteList.includes(to.path)) return "/login"
  // 如果已登录，则跳转到指定的页面

  // 关闭进度条
  NProgress.done()
})

export default router