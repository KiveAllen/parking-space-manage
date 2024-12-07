<template>
  <van-image :src=orderPhoto></van-image>
  <van-cell-group>
    <van-cell
        :value="address"
        title="名称"
    />
    <van-cell
        :value="orderNumber"
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
        title="单价"
    />
    <van-cell
        title="数量"
    >
      <van-stepper v-model="orderStepper" max="7" min="1"/>
    </van-cell>
  </van-cell-group>

  <van-submit-bar :price="orderStepper*price*100" button-text="提交订单" @submit="onSubmit"/>

</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {getParkingSpaceByIdUsingGet} from "../api/parkingSpaceController.ts";
import {useRoute, useRouter} from "vue-router";
import {addReservationUsingPost} from "../api/reservationController.ts";
import {format, startOfDay} from 'date-fns';
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();

const orderStepper = ref(1);
const orderPhoto = ref('')
const area = ref('')
const address = ref('')
const orderNumber = ref('')
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
    orderPhoto.value = res.data.parkPhoto;
    area.value = areaString;
    address.value = res.data.addressDescription.replace(area, '');
    orderNumber.value = res.data.parkNumber;
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


const onSubmit = async () => {

  const startTime = format(startOfDay(new Date()), 'yyyy-MM-dd HH:mm:ss');
  // 通过类型判断endtime是否为自定义
  let endTime = '';
  if (priceType.value == '周') {
    // startTime添加 （周 * orderStepper）天
    endTime = format(new Date(startOfDay(new Date()).getTime() + 7 * 24 * 60 * 60 * 1000 * orderStepper.value)
        , 'yyyy-MM-dd HH:mm:ss');
  } else {
    endTime = format(new Date(startOfDay(new Date()).getTime() + 24 * 60 * 60 * 1000 * orderStepper.value)
        , 'yyyy-MM-dd HH:mm:ss');
  }
  console.log(startTime, endTime)
  const res = await addReservationUsingPost({
    name: address.value,
    spaceId: parseInt(route.query.id),
    reservationStatus: 1,
    reservationTimeStart: startTime,
    reservationTimeEnd: endTime,
    totalCost: orderStepper.value * price.value,
    ownerId: userId.value,
  });

  if (res.data) {
    showSuccessToast('预定车位成功');
    router.push("/park")
  } else {
    showFailToast('预定车位失败');
  }

}

</script>


<style scoped>


.van-image {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 80%;
  height: 200px;
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
