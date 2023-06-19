<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { TopDep } from '@/types/Consult'
import { getAllDep } from '@/api/Consult'
import { watch } from 'vue';

// 一级科室
const allDep = ref<TopDep[]>([])

// 获取科室的数据
onMounted(async () => {
    const { data } = await getAllDep()

    allDep.value = data
})


const active = ref(0)

// 二级科室，注意：组件初始化没有数据 child 可能拿不到
const subDep = computed(() => allDep.value[active.value]?.child)
</script>

<template>
    <div class="consult-dep-page">
        <cp-nav-bar title="选择科室" />

        <div class="wrapper">
            <van-sidebar v-model="active">
                <van-sidebar-item :title="top.name" v-for="top in allDep" :key="top.id" />
            </van-sidebar>

            <div class="sub-dep">
                <router-link to="/consult/illness" v-for="sub in subDep" :key="sub.id">{{ sub.name }}</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
    width: 114px;

    &-item {
        padding: 14px;
        color: var(--cp-tag);

        &--select {
            color: var(--cp-main);
            font-weight: normal;

            &::before {
                display: none;
            }
        }
    }
}

.consult-dep-page {
    padding-top: 46px;
}

.wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;

    .sub-dep {
        flex: 1;
        height: 100%;
        overflow-y: auto;

        >a {
            display: block;
            padding: 14px 30px;
            color: var(--cp-dark);
        }
    }
}
</style>
