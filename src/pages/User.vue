<template>
  <van-image :src="avatar"></van-image>
  <van-cell-group inset>
    <van-cell :label="name" title="用户名称"/>
    <van-cell :label="phone" title="手机号"/>
    <van-cell :label="roleType" title="用户类型"/>
    <van-cell :label="registerTime" title="注册时间"/>
    <van-cell is-link title="编辑" to="/user/update"/>
    <van-cell is-link title="退出登录" @click="logout"/>
  </van-cell-group>
</template>


<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {useUserStore} from '../store/user';
import {useRouter} from "vue-router";
import {getLoginUserUsingGet, userLogoutUsingPost} from "../api/userController.ts";

const avatar = ref('')
const name = ref('')
const phone = ref('')
const roleType = ref('')
const registerTime = ref('')

const router = useRouter();
const userStore = useUserStore()

onMounted(async () => {
  const user = await getLoginUserUsingGet()
  if (user.data) {
    avatar.value = user.data.avatar
    name.value = user.data.name
    phone.value = user.data.phone
    roleType.value = user.data.roleType == 2 ? '管理员' : '用户'
    // 格式化时间
    registerTime.value = new Date(user.data.registerTime).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  } else {
    showFailToast("未登录，请先登录");
    router.push('/user/login')
  }
})

const logout = async () => {
  const res = await userLogoutUsingPost();
  if (res.data) {
    showSuccessToast("退出成功");
    userStore.logout();
    router.push("/user/login");
  }
}


</script>


<style scoped>


.van-image {
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translate(-50%);

}

:deep(.van-image__img ) {
  border-radius: 50%;

}


</style>
