<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'

import { onMounted, onUnmounted, ref } from 'vue'
import { type Socket, io } from 'socket.io-client'
import { baseURL } from '@/utils/Request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/Room'
import { MsgType, OrderType } from '@/enums'
import type { ConsultOrderItem } from '@/types/Consult'
import { getConsultOrderDetailAPI } from '@/api/Patient'

const store = useUserStore()
const route = useRoute()

let socket: Socket
const list = ref<Message[]>([])
const consult = ref<ConsultOrderItem>()


onMounted(() => {
    socket = io(baseURL, {
        auth: {
            token: `Bearer ${store.user?.token}`
        },
        query: {
            orderId: route.query.orderId
        }
    })

    socket.on('connect', () => {
        // 建立连接成功
        console.log("connect");
    })

    // 聊天记录
    socket.on("chatMsgList", ({ data }: { data: TimeMessages[] }) => {
        const arr: Message[] = []

        data.forEach(item => {
            arr.push({
                msgType: MsgType.Notify,
                msg: { content: item.createTime },
                createTime: item.createTime,
                id: item.createTime
            })
        })

        list.value.unshift(...arr)
    })

    // 订单状态 在onMounted注册
    socket.on('statusChange', async () => {
        const res = await getConsultOrderDetailAPI(route.query.orderId as string)
        consult.value = res.data

        console.log(consult.value, 666);
    })

    socket.on("error", (event) => {
        // 错误异常消息
        console.log("error");
    })

    socket.on("disconnect", () => {
        // 已经断开连接
        console.log("disconnect");
    })
})

onMounted(async () => {
    const res = await getConsultOrderDetailAPI(route.query.orderId as string)
    consult.value = res.data
})

// 在组件卸载时关闭socket
onUnmounted(() => {
    socket.close()
})
</script>

<template>
    <div class="room-page">
        <CpNavBar title="问诊室" />
        <RoomStatus :status="consult?.status" :countdown="consult?.countdown"></RoomStatus>
        <RoomMessage :list="list"></RoomMessage>
        <RoomAction :disabled="consult?.status !== OrderType.ConsultChat"></RoomAction>
    </div>
</template>

<style lang="scss" scoped>
.room-page {
    padding-top: 90px;
    padding-bottom: 60px;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: var(--cp-bg);

    .van-pull-refresh {
        width: 100%;
        min-height: calc(100vh - 150px);
    }
}
</style>
