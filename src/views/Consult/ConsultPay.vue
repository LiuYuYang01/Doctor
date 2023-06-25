<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getConsultOrderPreAPI } from '@/api/Consult'
import { getPatientDetailAPI } from '@/api/User'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/Consult'
import type { Patient } from '@/types/User'
import { showToast } from 'vant';

const store = useConsultStore()

const payInfo = ref<ConsultOrderPreData>()

const getConsultOrderPre = async () => {
    const res = await getConsultOrderPreAPI({
        type: store.consult.type,
        illnessType: store.consult.illnessType
    })

    payInfo.value = res.data
    // 设置默认优惠券
    store.setCoupon(payInfo.value.couponId)

}

const patient = ref<Patient>()

// 获取患者详情信息
const getPatientDetail = async () => {
    // 如果没有ID
    if (!store.consult.patientId) return

    const { data } = await getPatientDetailAPI(store.consult.patientId)

    patient.value = data
}

onMounted(() => {
    getConsultOrderPre()
    getPatientDetail()
})

const agree = ref<boolean>(false)
const show = ref<boolean>(false)
const paymentMethod = ref<0 | 1>()

const submit = async () => {    
    if (!agree.value) return showToast('请勾选我已同意支付协议')

    console.log(123);
    

    show.value = !show.value
}
</script>

<template>
    <div class="consult-pay-page">
        <cp-nav-bar title="支付" />

        <div class="pay-info">
            <p class="tit">图文问诊 49 元</p>
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <p class="desc">
                <span>极速问诊</span>
                <span>自动分配医生</span>
            </p>
        </div>

        <van-cell-group>
            <van-cell title="优惠券" value="-¥10.00" />
            <van-cell title="积分抵扣" value="-¥10.00" />
            <van-cell title="实付款" value="¥29.00" class="pay-price" />
        </van-cell-group>

        <div class="pay-space"></div>

        <van-cell-group>
            <van-cell title="患者信息" value="李富贵 | 男 | 30岁"></van-cell>
            <van-cell title="病情描述" label="头痛，头晕，恶心"></van-cell>
        </van-cell-group>

        <div class="pay-schema">
            <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
        </div>

        <van-submit-bar button-type="primary" :price="2900" button-text="立即支付" text-align="left" @click="submit"/>
    </div>

    <van-action-sheet v-model:show="show" title="选择支付方式">
        <div class="pay-type">
            <p class="amount">￥{{ payInfo?.actualPayment.toFixed(2) }}</p>

            <van-cell-group>
                <van-cell title="微信支付" @click="paymentMethod = 0">
                    <template #icon><cp-icon name="consult-wechat" /></template>
                    <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
                </van-cell>

                <van-cell title="支付宝支付" @click="paymentMethod = 1">
                    <template #icon><cp-icon name="consult-alipay" /></template>
                    <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
                </van-cell>
            </van-cell-group>

            <div class="btn">
                <van-button type="primary" round block>立即支付</van-button>
            </div>
        </div>
    </van-action-sheet>
</template>

<style lang="scss" scoped>
.consult-pay-page {
    padding: 46px 0 50px 0;
}

.pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;

    .tit {
        width: 100%;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .img {
        margin-right: 10px;
        width: 38px;
        height: 38px;
        border-radius: 4px;
        overflow: hidden;
    }

    .desc {
        flex: 1;

        >span {
            display: block;
            color: var(--cp-tag);

            &:first-child {
                font-size: 16px;
                color: var(--cp-text2);
            }
        }
    }
}

.pay-price {
    ::v-deep() {
        .vam-cell__title {
            font-size: 16px;
        }

        .van-cell__value {
            font-size: 16px;
            color: var(--cp-price);
        }
    }
}

.pay-space {
    height: 12px;
    background-color: var(--cp-bg);
}

.pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
        color: var(--cp-primary);
    }
}

:deep(.van-submit-bar__button) {
    font-weight: normal;
    width: 160px;
}

.pay-type {
    .amount {
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }

    .btn {
        padding: 15px;
    }

    .van-cell {
        align-items: center;

        .cp-icon {
            margin-right: 10px;
            font-size: 18px;
        }

        .van-checkbox :deep(.van-checkbox__icon) {
            font-size: 16px;
        }
    }
}
</style>
