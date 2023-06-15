<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UserInfo } from '@/types/User';
import { getUserInfoAPI } from '@/api/User'
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import { showConfirmDialog, showNotify } from 'vant';

const userInfo = ref<UserInfo>()

// 获取用户信息
onMounted(async () => {
    const { data } = await getUserInfoAPI()
    console.log(data,444);
    
    userInfo.value = data
})

// 快捷工具
const tools = [
    { label: '我的问诊', path: '/user/consult' },
    { label: '我的处方', path: '/' },
    { label: '家庭档案', path: '/user/patient' },
    { label: '地址管理', path: '/user/address' },
    { label: '我的评价', path: '/' },
    { label: '官方客服', path: '/' },
    { label: '设置', path: '/' }
]

const store = useUserStore()
const router = useRouter()

// 退出登录
const logout = async () => {
    // 消息确认框
    showConfirmDialog({
        title: "温馨提示",
        message: "您缺点要退出优医问诊吗？"
    }).then(() => {
        // 清除用户信息
        store.delUser()
        // 跳转到登录页
        router.push("/login")

        // 消息提示
        showNotify({ type: 'primary', message: '退出登录成功~' });
    }).catch(() => {
        console.log("取消");
    })
}
</script>

<template>
    <div class="user-page" v-if="userInfo">
        <!-- 我的信息 -->
        <div class="user-page-head">
            <div class="top">
                <van-image round fit="cover" :src="userInfo.avatar" />

                <div class="name">
                    <p>{{ userInfo.account }}</p>
                    <p><van-icon name="edit" /></p>
                </div>
            </div>

            <van-row>
                <van-col span="6">
                    <p>{{ userInfo.collectionNumber }}</p>
                    <p>收藏</p>
                </van-col>

                <van-col span="6">
                    <p>{{ userInfo.likeNumber }}</p>
                    <p>关注</p>
                </van-col>

                <van-col span="6">
                    <p>{{ userInfo.score }}</p>
                    <p>积分</p>
                </van-col>

                <van-col span="6">
                    <p>{{ userInfo.couponNumber }}</p>
                    <p>优惠券</p>
                </van-col>
            </van-row>
        </div>

        <!-- 我的订单 -->
        <div class="user-page-order">
            <div class="head">
                <h3>药品订单</h3>
                <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
            </div>
            <van-row>
                <van-col span="6">
                    <van-badge :content="userInfo.orderInfo.paidNumber || ''">
                        <CpIcon name="user-paid" />
                    </van-badge>
                    <p>待付款</p>
                </van-col>

                <van-col span="6">
                    <van-badge :content="userInfo.orderInfo.shippedNumber || ''">
                        <cp-icon name="user-shipped" />
                    </van-badge>
                    <p>待发货</p>
                </van-col>

                <van-col span="6">
                    <van-badge :content="userInfo.orderInfo.receivedNumber || ''">
                        <cp-icon name="user-received" />
                    </van-badge>
                    <p>待收货</p>
                </van-col>

                <van-col span="6">
                    <van-badge :content="userInfo.orderInfo.finishedNumber || ''">
                        <cp-icon name="user-finished" />
                    </van-badge>
                    <p>已完成</p>
                </van-col>
            </van-row>
        </div>

        <!-- 快捷工具 -->
        <div class="user-page-group">
            <h3>快捷工具</h3>
            <van-cell :title="label" is-link :border="false" :to="path" v-for="{ label, path }, index in tools">
                <template #icon><cp-icon :name="`user-tool-0${index + 1}`" /></template>
            </van-cell>
        </div>

        <van-button type="primary" class="logout" round @click="logout">退出登录</van-button>
    </div>
</template>

<style lang="scss" scoped>
.user-page {
    background-color: var(--cp-bg);
    min-height: calc(100vh - 50px);
    padding: 0 15px 65px;

    // 头部
    &-head {
        height: 200px;
        background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
        margin: 0 -15px;
        padding: 0 15px;

        .top {
            display: flex;
            padding-top: 50px;
            align-items: center;

            .van-image {
                width: 70px;
                height: 70px;
            }

            .name {
                padding-left: 10px;

                p {
                    &:first-child {
                        font-size: 18px;
                        font-weight: 500;
                    }

                    &:last-child {
                        margin-top: 10px;
                        color: var(--cp-primary);
                        font-size: 16px;
                    }
                }
            }
        }

        .van-row {
            margin: 0 -15px;
            padding-top: 15px;

            p {
                text-align: center;

                &:first-child {
                    font-size: 18px;
                    font-weight: 500;
                }

                &:last-child {
                    color: var(--cp-dark);
                    font-size: 12px;
                    padding-top: 4px;
                }
            }
        }
    }

    // 订单
    &-order {
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 15px;
        padding-bottom: 15px;

        .head {
            display: flex;
            justify-content: space-between;
            line-height: 50px;
            padding: 0 15px;

            a {
                color: var(--cp-tip);
            }
        }

        .van-col {
            text-align: center;

            .cp-icon {
                font-size: 28px;
            }

            p {
                font-size: 12px;
                padding-top: 4px;
            }
        }
    }

    // 分组
    &-group {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;

        h3 {
            padding-left: 16px;
            line-height: 44px;
        }

        .van-cell {
            align-items: center;
        }

        .cp-icon {
            font-size: 17px;
            margin-right: 10px;
        }
    }

    .logout {
        display: block;
        width: 100%;
        margin: 20px auto;
        text-align: center;
        color: #fff;
    }
}
</style>
