<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="typeValue" :options="orderType" @change="getOrderList"/>
    <van-dropdown-item v-model="statusValue" :options="orderStatus" @change="getOrderList"/>
  </van-dropdown-menu>

  <div class="order-container">
    <div v-for="(order, index) in orders"
         :key="index"
         class="order-list">
      <div class="order-item">
        <div class="order-item-name">
          <div class="order-item-name-top">{{ order.name }}</div>
          <div class="order-item-name-bottom">￥{{ order.totalCost }}</div>
        </div>
        <div class="order-item-time">
          <div class="order-item-time-name">
            {{ getOrderStatus(order.reservationStatus) }}
          </div>
          <van-Button class="order-item-time-time" round size="small" type="primary" @click="goDetail(order.id)">查看
          </van-Button>
        </div>
      </div>
    </div>
  </div>


</template>


<script lang="ts" setup>

import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from '../store/user';
import {showFailToast} from "vant";
import {getLoginUserUsingGet} from "../api/userController.ts";
import {listReservationByPageUsingPost} from "../api/reservationController.ts";

const typeValue = ref(0);
const statusValue = ref(0);

const router = useRouter();
const userStore = useUserStore();

const goDetail = (id) => {
  router.push({
    path: '/order/detail',
    query: {
      id
    }
  })
}

onMounted(async () => {
  const user = await getLoginUserUsingGet();
  if (user.data) {
    userStore.login(user.data)
  } else {
    showFailToast('获取用户信息失败')
    router.push('/user/login')
  }

  const res = await listReservationByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    userId: userStore.userInfo.id
  });

  orders.value = res.data.records;
})

const getOrderList = async () => {
  const res = await listReservationByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    userId: typeValue.value === 0 ? userStore.userInfo.id : undefined,
    ownerId: typeValue.value === 1 ? userStore.userInfo.id : undefined,
    reservationStatus: statusValue.value === 0 ? undefined : statusValue.value,
  });
  orders.value = res.data.records;
}

const getOrderStatus = (status: number) => {
  switch (status) {
    case 1:
      return '已预定';
    case 2:
      return '已取消';
    case 3:
      return '已完成';
    default:
      return '全部订单';
  }
}

const orderType = [
  {text: '我的订单', value: 0},
  {text: '租客订单', value: 1},
];
const orderStatus = [
  {text: '全部订单', value: 0},
  {text: '已预定', value: 1},
  {text: '已取消', value: 2},
  {text: '已完成', value: 3},
];

const orders = ref([])
</script>


<style scoped>
.van-dropdown-menu {
  width: 100%;
}

.order-container {
  background-color: #f7f8fa;
  overflow-x: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 5px;

  .order-list {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 20px;

    .order-item {
      display: flex;
      justify-content: space-between;

      .order-item-name-top {
        width: 100%;
        height: 32px;
        font-size: 18px;
        color: #1296db;
      }

      .order-item-name-bottom {
        font-size: 18px;
        margin-top: 5px;
      }

      .order-item-time-name {
        width: 100%;
        height: 32px;
        color: #000000;
        text-align: right;
      }

      .order-item-time-time {
        font-size: 12px;
        color: #ffffff;
        text-align: right;
      }
    }
  }
}


</style>
