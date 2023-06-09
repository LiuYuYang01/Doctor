<script setup lang="ts">

</script>

<template>
  <svg aria-hidden="true">
    <!-- #icon-文件夹名称-图片名称 -->
    <use href="#icon-login-eye-off" />
  </svg>

  <button @click="$router.push('/login')">去登录</button>

  <RouterView />
</template>

<style scoped lang="scss"></style>
