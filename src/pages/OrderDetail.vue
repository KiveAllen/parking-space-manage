<template>
  <van-image :src=orderPhoto></van-image>
  <van-cell-group>
    <van-cell
        :value="orderNumber"
        title="停车场区域号"
    />
    <van-cell
        :value="startDate"
        title="起始日期"
    />
    <van-cell
        :value="endDate"
        title="结束日期"
    />
    <van-cell
        :value="price"
        title="总金额"
    />
    <van-cell title="订单状态">
      <template #right-icon>
        <van-tag v-if="reservationStatus==1" type="warning">已预订</van-tag>
        <van-tag v-if="reservationStatus==2" type="danger">已取消</van-tag>
        <van-tag v-if="reservationStatus==3" type="success">已完成</van-tag>
      </template>
    </van-cell>
    <van-cell
        v-if="reservationStatus==3"
        title="评分"
    >
      <van-rate v-model="starValue"/>
    </van-cell>
    <van-field
        v-if="reservationStatus==3 && showFeedback"
        v-model="message"
        autosize
        label="评论"
        maxlength="50"
        placeholder="评论"
        rows="1"
        show-word-limit
        type="textarea"
    />
    <van-cell
        v-if="reservationStatus==3 && !showFeedback"
        :value="message"
        title="评论"
    />
  </van-cell-group>
  <van-row v-if="reservationStatus==1">
    <van-col span="12">
      <van-button round type="warning" @click="toUpdate(2)">取消订单</van-button>
    </van-col>
    <van-col span="12">
      <van-button round type="success" @click="toUpdate(3)">完成订单</van-button>
    </van-col>
  </van-row>
  <van-button v-if="reservationStatus==3 && showFeedback" round type="primary" @click="feedback">确定评论</van-button>
</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {getParkingSpaceByIdUsingGet} from "../api/parkingSpaceController.ts";
import {useRoute, useRouter} from "vue-router";
import {getReservationByIdUsingGet, updateReservationUsingPost} from "../api/reservationController.ts";
import {showFailToast, showSuccessToast} from "vant";
import {addFeedbackUsingPost, getFeedbackByIdUsingGET} from "../api/feedbackController.ts";

const router = useRouter();
const route = useRoute();

const starValue = ref(3);
const message = ref();
const orderPhoto = ref('')
const area = ref('')
const address = ref('')
const orderNumber = ref('')
const price = ref()
const startDate = ref('');
const endDate = ref('');
const priceType = ref();
const userId = ref();
const spaceId = ref();

const showFeedback = ref(true);

const reservationStatus = ref();

const feedback = async () => {
  const res = await addFeedbackUsingPost({
    commentText: message.value,
    commentImage: '',
    rating: starValue.value,
    spaceId: spaceId.value,
    reservationId: route.query.id
  });
  if (res.data) {
    showSuccessToast('评论成功!');
    router.push("/order")
    return
  }
}

const toUpdate = async (status: number) => {
  const res = await updateReservationUsingPost({
    id: route.query.id,
    reservationStatus: status,
  });
  if (res.data && status == 2) {
    showSuccessToast('取消成功!');
    router.push("/order")
    return
  }
  if (res.data && status == 3) {
    showSuccessToast('订单已完成!');
    router.push("/order")
    return
  }
  showFailToast('操作失败!');
}


onMounted(async () => {
  const reservation = await getReservationByIdUsingGet({
    id: route.query.id
  });

  const res = await getParkingSpaceByIdUsingGet({
    id: reservation.data.spaceId
  });

  const feedbackData = await getFeedbackByIdUsingGET({
    reservationId: route.query.id
  });

  console.log('feedbackData', feedbackData)
  if (feedbackData.data) {
    console.log('feedbackData.data', feedbackData.data)
    showFeedback.value = false;
    starValue.value = feedbackData.data.rating;
    message.value = feedbackData.data.commentText;
  }


  if (reservation == null) {
    showFailToast('订单不存在');
    router.push("/order")
    return
  }

  reservationStatus.value = reservation.data.reservationStatus
  const first = reservation.data.reservationTimeStart.split(' ')[0];
  startDate.value = first
  const second = reservation.data.reservationTimeEnd.split(' ')[0];
  endDate.value = second

  console.log('res', res)
  if (res.data) {
    const areaString = res.data.addressDescription.split('区')[0] + `区`;
    orderPhoto.value = res.data.parkPhoto;
    area.value = areaString;
    address.value = res.data.addressDescription.replace(area, '');
    orderNumber.value = res.data.parkNumber;
    price.value = res.data.price;
    priceType.value = res.data.priceType == 1 ? '日' : res.data.priceType == 2 ? '周' : '自定义';
    userId.value = res.data.userId;
    spaceId.value = res.data.id;
  }
})


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
