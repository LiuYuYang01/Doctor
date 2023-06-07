<script setup lang="ts">
import useUserStore from '@/stores'
const store = useUserStore()
</script>

<template>
  <div>{{ store }}</div>
  <div>{{ store.user }}</div>
</template>

<style scoped lang="scss"></style>
