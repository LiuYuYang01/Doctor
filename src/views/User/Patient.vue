<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Patient } from '@/types/User';
import { addPatientAPI, getPatientAPI, editPatientAPI, delPatientAPI } from '@/api/Patient'
import { nameRules, idCardRules } from '@/utils/Rules'
import { type FormInstance, showConfirmDialog, showNotify } from 'vant';

// 患者信息
const list = ref<Patient[]>([])

// 获取患者信息
const getPatientList = async () => {
    const { data } = await getPatientAPI()
    list.value = data
}

onMounted(() => {
    getPatientList()
})

// 默认选中的性别
const gender = ref<string | number>(1)

// 性别
const options = [
    { label: '男', value: 1 },
    { label: '女', value: 0 }
]





// 表单初始化的数据
const initPatient: Patient = {
    name: '',
    idCard: '',
    gender: 1,
    defaultFlag: 0
}

// 表单数据
const patient = ref<Patient>({ ...initPatient })

// 打开侧滑栏
const show = ref(false)

const showPopup = (item?: Patient) => {
    show.value = true

    if (item) {
        // 编辑患者
        // 解构出来接口需要的数据
        const { id, gender, name, idCard, defaultFlag } = item
        patient.value = { id, gender, name, idCard, defaultFlag }
    } else {
        // 添加患者
        // 每点击侧滑栏 先初始化数据
        patient.value = { ...initPatient }
    }
}

// 默认值需要转换
const defaultFlag = computed<number | boolean>({
    get() {
        return patient.value.defaultFlag === 1 ? true : false
    },
    set(value) {
        patient.value.defaultFlag = value ? 1 : 0
    }
})



// 表单实例
const from = ref<FormInstance>()

// 提交表单
const onSubmit = async () => {
    // 对表单进行整体校验
    await from.value?.validate()

    // 判断性别是否与身份证上的一致

    // 身份证倒数第二位，单数是男，双数是女
    const gender = +patient.value.idCard.slice(-2, -1) % 2
    if (gender !== patient.value.gender) {
        await showConfirmDialog({
            title: '温馨提示',
            message: '填写的性别和身份证号中的不一致\n您确认提交吗？'
        })
    }

    // 添加 / 编辑患者
    patient.value.id ? await editPatientAPI(patient.value) : await addPatientAPI(patient.value)
    // 获取最新数据
    await getPatientList()
    // 关闭侧边框
    show.value = false

    // 消息提示
    showNotify({ type: 'primary', message: patient.value.id ? '编辑患者成功' : '新增患者成功', background: "#16c2a3" });
}

// 删除患者
const remove = () => {
    showConfirmDialog({
        title: '警告',
        message: '你确定要删除该患者吗？',
    }).then(async () => {
        // 调用删除患者接口
        await delPatientAPI(patient.value.id!)
        // 关闭侧边框
        show.value = false
        // 重新获取数据
        getPatientList()
        // 消息提示
        showNotify({ type: 'primary', message: '删除患者成功', background: "#16c2a3" });
    })
}
</script>

<template>
    <div class="patient-page">
        <CpNavBar title="家庭档案"></CpNavBar>

        <div class="patient-list">
            <div class="patient-item" v-for="item in list" :key="item.id">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1******\$2') }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>

                <!-- 修改按钮 -->
                <div class="icon" @click="showPopup(item)"><cp-icon name="user-edit" /></div>
                <div class="tag" v-if="item.defaultFlag === 1">默认</div>
            </div>

            <div class="patient-add" v-if="list.length < 6" @click="showPopup()">
                <cp-icon name="user-add" />
                <p>添加患者</p>
            </div>

            <div class="patient-tip">最多可添加 6 人</div>
        </div>

        <!-- <CpRadioBtn :options="options" :modelValue="gender" @update:modelValue="gender = $event" /> -->
        <!-- 简写：上述双向绑定方式等价于下述代码 -->
        <CpRadioBtn :options="options" v-model="gender" />
    </div>

    <!-- 侧边栏 -->
    <van-popup v-model:show="show" position="right" style="width: 100%; height: 100%;">
        <CpNavBar :title="patient.id ? '编辑患者' : '添加患者'" right-text="保存" :back="() => show = false" @clickRight="onSubmit">
        </CpNavBar>

        <van-form autocomplete="off" ref="form" style="margin-top: 50px;">
            <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" :rules="nameRules" />

            <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" :rules="idCardRules" />

            <van-field label="性别" class="pb4">
                <!-- 单选按钮组件 -->
                <template #input>
                    <cp-radio-btn v-model="patient.gender" :options="options"></cp-radio-btn>
                </template>
            </van-field>

            <van-field label="默认就诊人">
                <template #input>
                    <van-checkbox v-model="patient.defaultFlag" :icon-size="18" round />
                </template>
            </van-field>

            <van-button round block type="primary" native-type="submit" style="margin-top: 30px;" @click="onSubmit"
                v-if="!patient.id">添加患者</van-button>

            <van-button round block type="danger" native-type="submit" style="margin-top: 30px;" @click="remove"
                v-else="!patient.id">删除患者</van-button>
        </van-form>
    </van-popup>
</template>

<style lang="scss" scoped>
.patient-page {
    padding: 46px 0 80px;
}

.patient-list {
    padding: 15px;
}

.patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;

    .info {
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        span {
            color: var(--cp-tip);
            margin-right: 20px;
            line-height: 30px;

            &.name {
                font-size: 16px;
                color: var(--cp-text1);
                width: 80px;
                margin-right: 0;
            }

            &.id {
                color: var(--cp-text2);
                width: 180px;
            }
        }
    }

    .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
    }

    .tag {
        position: absolute;
        right: 60px;
        top: 21px;
        width: 30px;
        height: 16px;
        font-size: 10px;
        color: #fff;
        background-color: var(--cp-primary);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &.selected {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);

        .icon {
            color: var(--cp-primary);
        }
    }
}

.patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;

    .cp-icon {
        font-size: 24px;
    }
}

.patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
}

.pb4 {
    padding-bottom: 4px;
}

.patient-page {
    padding: 46px 0 80px;

    :deep() {
        .van-popup {
            width: 80%;
            height: 100%;
        }
    }
}
</style>
