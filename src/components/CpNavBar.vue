<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{ title?: string, rightText?: string, back?: () => boolean }>()
const emit = defineEmits<{ (e: "click-right"): void }>()
const router = useRouter()

// TODO 点击左侧返回按钮
const onClickLeft = () => {
    // 不刷新页面情况下返回上一级
    if (props.back) {
        return props.back()
    }

    // 通过history.state.back判断是否有上一级
    if (history.state.back) {
        // 如果有就回退到上一个页面
        router.back()
    } else {
        // 否则就回退到首页
        router.push("/")
    }
}

// TODO 点击右侧文字按钮
const onClickRight = () => {
    emit("click-right")
}
</script>

<template>
    <van-nav-bar fixed left-arrow :title="title" :right-text="rightText" @click-left="onClickLeft"
        @click-right="onClickRight"></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
    .van-nav-bar {
        &__arrow {
            font-size: 18px;
            color: var(--cp-text1);
        }

        &__text {
            font-size: 15px;
        }
    }
}
</style>
