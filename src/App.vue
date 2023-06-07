<script setup lang="ts">
import { useUserStore } from '@/stores'
import Request from '@/utils/Request';
const store = useUserStore()

import type { User } from '@/types/User';

// 测试发起请求
const btn = async () => {
  const res = await Request<User>('POST', '/login/password', {
    mobile: "13211112222",
    password: "abc12345"
  })

  // 设置用户数据
  store.setUser(res.data)
}
</script>

<template>
  <div>{{ store.user }}</div>
  <button @click="store.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">登录</button>
  <button @click="store.delUser()">删除</button>

  <button @click="btn">发起网络请求</button>

  <RouterView />
</template>

<style scoped lang="scss"></style>
