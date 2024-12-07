<template>
  <div class="park-detail-name"
       style="font-size: 18px; padding: 20px 20px 0px 20px"
  >{{ address }}
  </div>
  <van-image :src=parkPhoto></van-image>
  <van-cell-group>
    <van-cell
        :value="parkNumber"
        title="停车场区域号"
    />
    <van-cell
        :value="priceType"
        title="价格设置类型"
    />
    <van-cell
        v-if="priceType == '自定义'"
        :value="startDate"
        title="起始时间"

    />
    <van-cell
        v-if="priceType == '自定义'"
        :value="endDate"
        title="结束时间"
    />

    <van-cell
        :value="price"
        title="价格"
    />
  </van-cell-group>

  <van-button v-if="userId==userStore.userInfo.id" round type="primary" @click="toUpdate">修改</van-button>
  <van-button v-else round type="primary" @click="toOrder">预约</van-button>

</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {getParkingSpaceByIdUsingGet} from "../api/parkingSpaceController.ts";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../store/user.ts";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const parkPhoto = ref('')
const area = ref('')
const address = ref('')
const parkNumber = ref('')
const price = ref()
const startDate = ref('');
const endDate = ref('');
const priceType = ref();
const userId = ref();


onMounted(async () => {
  const res = await getParkingSpaceByIdUsingGet({
    id: route.query.id
  });
  console.log('res', res)
  if (res.data) {
    const areaString = res.data.addressDescription.split('区')[0] + `区`;
    parkPhoto.value = res.data.parkPhoto;
    area.value = areaString;
    address.value = res.data.addressDescription.replace(area, '');
    parkNumber.value = res.data.parkNumber;
    price.value = res.data.price;
    priceType.value = res.data.priceType == 1 ? '日' : res.data.priceType == 2 ? '周' : '自定义';

    if (res.data.customTimeStart && res.data.customTimeEnd) {
      const first = res.data.customTimeStart.split(' ')[1];
      startDate.value = first
      const second = res.data.customTimeEnd.split(' ')[1];
      endDate.value = second
    }

    userId.value = res.data.userId;
  }
})

const toUpdate = () => {
  router.push({
    path: '/park/update',
    query: {
      id: route.query.id,
    }
  })
}

const toOrder = () => {
  router.push({
    path: '/order/add',
    query: {
      id: route.query.id,
    }
  })
}

</script>


<style scoped>


.van-image {
  margin-top: 20px;
  width: 90%;
  height: 250px;
  left: 50%;
  transform: translate(-50%);

}


.van-button {
  margin-top: 20px;
  left: 50%;
  width: 80%;
  transform: translate(-50%);
}


</style>
