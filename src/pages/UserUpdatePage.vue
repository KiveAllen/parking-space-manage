<template>
  <van-image :src=avatar></van-image>
  <van-cell-group inset>
    <van-field
        v-model="avatar"
        label="头像"
        placeholder="请输入头像链接"
    />
    <van-field
        v-model="name"
        label="名称"
        placeholder="名称"
    />
    <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
    />

  </van-cell-group>

  <van-button round type="success" @click="submit">保存</van-button>

</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {useUserStore} from "../store/user.ts";
import {getLoginUserUsingGet, updateUserUsingPost} from "../api/userController.ts";
import {useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from 'vant'

const avatar = ref('')
const name = ref('')
const phone = ref('')

const userStore = useUserStore();
const router = useRouter();

async function submit() {
  const res = await updateUserUsingPost({
    avatar: avatar.value,
    name: name.value,
    phone: phone.value,
    id: userStore.userInfo.id
  });
  if (res.data) {
    showSuccessToast('修改成功')
    const user = await getLoginUserUsingGet();
    userStore.login(user.data)
    router.push('/user')
  } else {
    showFailToast('修改失败')
  }

}

onMounted(async () => {
  const user = await getLoginUserUsingGet();
  avatar.value = user.data.avatar
  name.value = user.data.name
  phone.value = user.data.phone
  userStore.login(user.data)
})

</script>


<style scoped>


.van-image {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translate(-50%);

}

:deep(.van-image__img ) {
  border-radius: 50%;

}

.van-button {
  margin-top: 20px;
  left: 50%;
  width: 80%;
  transform: translate(-50%);
}


</style>
