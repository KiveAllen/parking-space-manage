<template>
  <div class="container">
    <MapComponent ref="map"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useUserStore} from '../store/user';
import MapComponent from "../components/MapComponent.vue";
import {showFailToast} from 'vant';
import {getLoginUserUsingGet} from "../api/userController.ts";


const map = ref<InstanceType<typeof MapComponent> | null>(null);

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  // 获取用户信息
  const user = await getLoginUserUsingGet();
  if (user) {
    userStore.login(user.data);
    map.value?.createMap();
  } else {
    showFailToast("未登录，请先登录");
    router.push("/user/login");
  }

  setTimeout(async () => {
    console.log("route", route)
    const park = route.query.park;
    if (park) {
      map.value?.drawRoute(park);
    }
  }, 1000)

})

</script>


<style scoped>

.container {
  position: absolute;
  width: 100%;
  height: calc(100% - 90px);
  z-index: -1;
}


</style>
