<template>
  <el-image style="margin-top: 150px" src="../../public/car.svg"></el-image>
  <el-form style="position: absolute; width: 400px; left: 50%; transform: translateX(-50%);" @submit.prevent="onSubmit">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码" prop="code">
      <el-input v-model="code" placeholder="请输入短信验证码" clearable>
        <template #append>
          <el-button
              :disabled="countdown > 0"
              type="primary"
              @click="sendCode"
          >
            {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-button style="width:400px;" type="primary" native-type="submit" round block>
      登录
    </el-button>
  </el-form>

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useUserStore} from '../store/user';
import {ElMessage} from "element-plus";
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
    ElMessage.error("手机号格式不正确");
    return;
  }
  if (code.value.length !== 4) {
    ElMessage.error("验证码格式不正确");
    return;
  }
  const res = await userRegisterAndLoginUsingPost({
    phone: phone.value,
    code: code.value,
  });
  if (res.data) {
    ElMessage.success("登录成功");
    // 获取用户信息
    const user = await getLoginUserUsingGet();
    userStore.login(user.data)
    router.push("/user/manage");
  }
};

const sendCode = async () => {
  if (phone.value.length !== 11) {
    ElMessage.error("手机号格式不正确");
    return;
  }
  const res = await sendCodeUsingGet({phone: phone.value});
  if (res.data) {
    ElMessage.success("验证码发送成功");
    startCountdown();
  } else {
    ElMessage.error("验证码发送失败");
  }
};
</script>

<style scoped>
.el-image {
  width: 200px;
  height: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
