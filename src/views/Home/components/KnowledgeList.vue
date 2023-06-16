<script setup lang="ts">
import { ref } from 'vue';
import KnowledgeCard from './KnowledgeCard.vue'
import type { KnowledgeType, KnowledgeParams, KnowledgeList } from '@/types/Consult';
import { getKnowledgeAPI } from '@/api/Consult'

const props = defineProps<{ type: KnowledgeType }>()

// 接口需要的参数
const params = ref<KnowledgeParams>({
    type: props.type,
    current: 1, // 当前页
    pageSize: 10 // 每页显示?个
})

// 知识列表
const list = ref<KnowledgeList>([]);

// 是否在加载中
const loading = ref(false);
// 是否还有数据
const finished = ref(false);

// 获取知识列表数据
const onLoad = async () => {
    const { data: { rows, pageTotal } } = await getKnowledgeAPI(params.value)
    // 合并数据
    list.value.push(...rows)

    // 当前页：current  |  总页数：pageTotal
    if (params.value.current >= pageTotal) {
        // 如果当前页大于了总页数就证明数据加载完毕了
        finished.value = true
    } else {
        // 否则就页数加1，加载下一页的数据
        params.value.current++
    }

    // 加载完毕
    loading.value = false
};
</script>

<template>
    <div class="knowledge-list">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <KnowledgeCard v-for="item in list" :key="item.id" :item="item" />
        </van-list>
    </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
    padding: 0 15px;
}
</style>
