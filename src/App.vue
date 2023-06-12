<script setup lang="ts">

</script>

<template>
  <button @click="$router.push('/login')">去登录</button>
  <CpIcon name="login-eye-on" />

  <RouterView />
</template>

<style scoped lang="scss"></style>
