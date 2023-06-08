<script setup lang="ts">
import router from '@/router';

const props = defineProps<{ title?: string, rightText?: string }>()
const emit = defineEmits<{ (e: "click-right"): void }>()

// TODO 点击左侧返回按钮
const onClickLeft = () => {
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
    <van-nav-bar fixed left-arrow title="登录" right-text="注册" @click-left="onClickLeft"
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
