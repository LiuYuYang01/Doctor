<script setup lang="ts"></script>

<template>
    <div class="consult-illness-page">
        <cp-nav-bar title="图文问诊" />
    </div>

    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
        <img class="img" src="@/assets/avatar-doctor.svg" />
        <div class="info">
            <p class="tit">在线医生</p>
            <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
            <p class="safe"><cp-icon name="consult-safe" /><span>内容仅医生可见</span></p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
    padding-top: 46px;
}

.illness-tip {
    display: flex;
    padding: 15px;

    .img {
        width: 52px;
        height: 52px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 10px;
    }

    .info {
        flex: 1;
        padding-left: 12px;

        .tit {
            font-size: 16px;
            margin-bottom: 5px;
        }

        .tip {
            padding: 12px;
            background: var(--cp-bg);
            color: var(--cp-text3);
            font-size: 13px;
            margin-bottom: 10px;
        }

        .safe {
            font-size: 10px;
            color: var(--cp-text3);
            display: flex;
            align-items: center;

            .cp-icon {
                font-size: 12px;
                margin-right: 2px;
            }
        }
    }
}
</style>
