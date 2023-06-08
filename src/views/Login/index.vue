<script setup lang="ts">
import { showToast } from 'vant';
import { ref } from 'vue';

// 用户信息
const loginInfo = ref({
  mobile: "",
  password: "",
  agree: false
})

// 用户登录
const login = () => {
  console.log(loginInfo.value.agree, 222);

  if (!loginInfo.value.agree) return showToast('请勾选我已同意')
  
  // 验证完毕，进行登录
}
</script>

<template>
  <div class="login-page">
    <CpNavBar right-text="注册" @click-right="$router.push('/register')"></CpNavBar>

    <!-- 头部 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login">
      <van-field placeholder="请输入手机号" type="tel" v-model="loginInfo.mobile" :rules="[
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
      ]" />

      <van-field placeholder="请输入密码" type="password" v-model="loginInfo.password" :rules="[
        { required: true, message: '请输入密码' },
        { pattern: /^\w\d{8,24}/, message: '密码必须是8 ~ 24个字符' }
      ]" />

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
</style>
