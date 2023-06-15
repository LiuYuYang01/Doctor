<!-- <script setup lang="ts"></script>

<template>
  <div class="article-page">Article</div>
</template>

<style lang="scss" scoped></style> -->


<script setup lang="ts">
import { ref } from 'vue'

const list = ref<number[]>([])

// 是否加载中
const loading = ref(false)

// 是否加载完毕
const finished = ref(false)

// 加载数据的逻辑
const onLoad = () => {
  // 模拟加载更多  一般用于调用网络请求，这里做个模拟
  setTimeout(() => {
    // 模拟接口中的数据
    const data = [1, 2, 3, 4, 5]
    // 将数据合并到本地
    list.value.push(...data)
    // 加载完成
    loading.value = false

    // 模拟加载完毕
    if (list.value.length > 20) {
      finished.value = true
    }
  }, 2000)
}
</script>

<template>
  <div class="knowledge-list">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <knowledge-card v-for="(item, i) in list" :key="i">{{ item }}</knowledge-card> -->
    </van-list>
  </div>
</template>
