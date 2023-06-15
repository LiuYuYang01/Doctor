<script setup lang="ts">
import { ref } from 'vue';
import type { DoctorList } from '@/types/consult';
import DoctorCard from './DoctorCard.vue'
import { getDoctorPageAPI } from '@/api/Consult';
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

// 医生列表
const list = ref<DoctorList>()

// 获取医生列表数据
const getDoctorPage = async () => {
    const { data: { rows } } = await getDoctorPageAPI({ current: 1, pageSize: 5 })
    list.value = rows
}
getDoctorPage()
</script>

<template>
    <div class="follow-doctor">
        <div className="head">
            <p>推荐关注</p>
            <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
        </div>

        <div class="body">
            <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
                <van-swipe-item v-for="item in list" :key="item.id">
                    <DoctorCard :item="item" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
    background-color: var(--cp-bg);
    height: 250px;

    .head {
        display: flex;
        justify-content: space-between;
        height: 45px;
        align-items: center;
        padding: 0 15px;
        font-size: 13px;

        >a {
            color: var(--cp-tip);
        }
    }

    .body {
        width: 100%;
        overflow: hidden;
    }
}
</style>
