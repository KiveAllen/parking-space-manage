<template>
  <van-image src="../../public/car.svg"></van-image>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          required
      />
      <van-field
          v-model="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
              :disabled="countdown > 0"
              size="small"
              type="primary"
              @click="sendCode"
          >
            {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="primary">
        注册&登录
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useUserStore} from '../store/user';
import {showFailToast, showSuccessToast} from "vant";
import {getLoginUserUsingGet, sendCodeUsingGet, userRegisterAndLoginUsingPost} from "../api/userController.ts";

const router = useRouter();

const phone = ref('');
const code = ref('');
const countdown = ref(0);
const userStore = useUserStore();

const startCountdown = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

const onSubmit = async () => {
  if (phone.value.length !== 11) {
    showFailToast("手机号格式不正确");
    return;
  }
  if (code.value.length !== 4) {
    showFailToast("验证码格式不正确");
    return;
  }
  const res = await userRegisterAndLoginUsingPost({
    phone: phone.value,
    code: code.value,
  });
  if (res.data) {
    showSuccessToast("注册&登录成功");
    // 获取用户信息
    const user = await getLoginUserUsingGet();
    userStore.login(user.data)
    router.push("/index");
  }
};

const sendCode = async () => {
  if (phone.value.length !== 11) {
    showFailToast("手机号格式不正确");
    return;
  }
  const res = await sendCodeUsingGet({phone: phone.value});
  if (res.data) {
    showSuccessToast("验证码发送成功");
    startCountdown();
  } else {
    showFailToast("验证码发送失败");
  }
};
</script>

<style scoped>
.van-image {
  width: 200px;
  height: 200px;
  left: 50%;
  transform: translate(-50%);
}
</style>
