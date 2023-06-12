<script setup lang="ts">
import { showNotify, showToast, type FormInstance } from 'vant';
import { reactive, ref } from 'vue';

import { useUserStore } from '@/stores'
import Request from '@/utils/Request';
const store = useUserStore()

import { useRouter, useRoute } from 'vue-router'
const [route, router] = [useRoute(), useRouter()]

import type { User } from '@/types/User'

// 控制密码框显示隐藏
const show = ref<boolean>(false)

// 用户信息
const loginInfo = reactive({
  mobile: "13230000100",
  password: "abc12345",
  code: "",
  agree: false,
})

// 密码 / 验证码切换
const isPass = ref<boolean>(true)

// 用户登录
const login = async () => {
  if (!loginInfo.agree) return showToast('请勾选我已同意')

  // 验证完毕，进行登录
  const { code, data } = isPass.value ? await Request<User>('POST', '/login/password', { mobile: loginInfo.mobile, password: loginInfo.password }) : await Request<User>('POST', '/login', { mobile: loginInfo.mobile, code: loginInfo.code })

  // 处理登录失败
  if (code !== 10000) return showNotify("登录失败")

  // 登录成功提示
  showNotify({ type: 'primary', message: '登录成功~' })

  // 将用户的信息保存到pinia
  store.setUser(data)

  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.push(<string>route.query.returnUrl || '/user')
}

// 验证码时间
const time = ref<number>(0)
// 表单实例
const form = ref<FormInstance>()

// 发送验证码
const sendCode = async () => {
  if (time.value > 0) return

  // 校验手机号是否合法
  await form.value?.validate("mobile")

  // 验证码登录
  const res = await Request<User>('GET', "/code", { mobile: loginInfo.mobile, type: "login" })

  console.log("接口响应的数据：", res);
  console.log("表单的数据：", { mobile: loginInfo.mobile, type: "login" });

  time.value = 60

  let timeId: number = 0
  // 清除定时器
  clearInterval(timeId)
  // 时间不断减减
  timeId = setInterval(() => {
    time.value--
  }, 1000)
}
</script>

<template>
  <div class="login-page">
    <CpNavBar right-text="注册" @click-right="router.push('/register')" />

    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? "密码登录" : "短信验证码登录" }}</h3>

      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? "密码登录" : "短信验证码登录" }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单 -->
    <van-form autocomplete="off" ref="form" @submit="login">
      <van-field placeholder="请输入手机号" type="tel" v-model="loginInfo.mobile" name="mobile" :rules="[
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
      ]" />

      <!-- 密码登录 -->
      <van-field placeholder="请输入密码" :type="show ? 'text' : 'password'" v-model="loginInfo.password" :rules="[
        { required: true, message: '请输入密码' },
        { pattern: /^[\w\d]{8,24}/, message: '密码必须是8 ~ 24个字符' }
      ]" v-if="isPass">

        <template #button>
          <CpIcon :name="`login-eye-${show ? 'on' : 'off'}`" @click="show = !show" />
        </template>
      </van-field>

      <!-- 验证码登录 -->
      <van-field placeholder="短信验证码" v-model="loginInfo.code" :rules="[
        { required: true, message: '请输入验证码' },
        { pattern: /^\d{6}$/, message: '验证码 6 个数字' }
      ]" v-else>
        <template #button>
          <span class="btn-send" @click="sendCode">{{ time > 0 ? `${time}秒后再次发送` : "发送验证码" }}</span>
        </template>
      </van-field>

      <div class="cp-cell">
        <van-checkbox v-model="loginInfo.agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>

      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>

      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>

      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}

:deep(.van-field__button) {
  position: relative;
  top: 2px;
  padding-right: 15px;
  font-size: 20px;
}
</style>
