<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="parkValue" :options="optionPart" @change="getPartList"/>
    <van-dropdown-item v-model="sortValue" :options="optionSort" @change="getPartList"/>
  </van-dropdown-menu>

  <van-search
      v-model="address"
      label="地址"
      placeholder="请输入前往的地址"
      show-action
      @search="getPartList"
  >
    <template #action>
      <div @click="getPartList">搜索</div>
    </template>
  </van-search>

  <div class="park-container">
    <div v-for="(park, index) in parks"
         :key="index"
         class="park-list">
      <div class="park-item">
        <div class="park-item-name" @click="toDetail(park.id)">
          <div class="park-item-name-top">{{ park.addressDescription }}</div>
          <div class="park-item-name-bottom">
            {{ getPrice(park.price, park.priceType, park.customTimeStart, park.customTimeEnd) }}
          </div>
        </div>
        <div class="park-item-go" @click="goMap(park)">
          <van-image class="park-item-go-img" src="public/go.svg"></van-image>
          <div class="park-item-go-min">{{ getDistance(park.distance) }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="add-parking-space">
    <van-button block round size="large" to="/park/add" type="primary">+</van-button>
  </div>


</template>


<script lang="ts" setup>

import {useRouter} from "vue-router";
import {showFailToast} from "vant";
import {onMounted, ref} from 'vue';
import {listParkingSpaceByPageUsingPost} from "../api/parkingSpaceController.ts";
import {useUserStore} from "../store/user.ts";
import {getLoginUserUsingGet} from "../api/userController.ts";
import {locationCenter} from "../store/locationCenter.ts";
import ParkingSpace = API.ParkingSpace;

const parkValue = ref(0);
const sortValue = ref(0);
const address = ref('');
const parks = ref([]);

const userStore = useUserStore();


const optionPart = [
  {text: '全部车位', value: 0},
  {text: '我的车位', value: 1},
];
const optionSort = [
  {text: '可预定', value: 0},
  {text: '已被预定', value: 1},
];

onMounted(async () => {
  const user = await getLoginUserUsingGet();
  if (user.data) {
    userStore.login(user.data)
  } else {
    showFailToast('获取用户信息失败')
    router.push('/user/login')
  }

  const center = locationCenter

  const res = await listParkingSpaceByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    longitude: center[0],
    latitude: center[1],
    isAvailable: sortValue.value === 0 ? 1 : 0,
  });
  parks.value = res.data.records;
})

const getPrice = (price: number, type: number, customTimeStart: string, customTimeEnd: string) => {
  if (type === 1) {
    return price + '元/天'
  } else if (type === 2) {
    return price + '元/周'
  } else {
    // 计算自定义时间是多少小时
    const start = new Date(customTimeStart);
    const end = new Date(customTimeEnd);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return price + '元/' + hours + '时'
  }
}

const getDistance = (distance: number) => {
  if (distance < 1000) {
    return distance.toFixed(1) + 'm'
  }
  if (distance > 10000) {
    return '>10km'
  }
  const km = (distance / 1000).toFixed(1);
  return km + 'km'
}

const center = locationCenter

const getPartList = async () => {
  const res = await listParkingSpaceByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    userId: parkValue.value === 1 ? userStore.userInfo.id : undefined,
    searchText: address.value,
    longitude: center[0],
    latitude: center[1],
    isAvailable: sortValue.value === 0 ? 1 : 0,
  });
  parks.value = res.data.records;
}

const router = useRouter();

const toDetail = (id: string) => {
  router.push({
    path: '/park/detail',
    query: {
      id,
    }
  })
}

const goMap = (park: ParkingSpace) => {
  router.push({
    path: '/index',
    query: {
      park: [park.longitude, park.latitude],
    }
  })
}

</script>


<style scoped>
.park-container {
  background-color: #f7f8fa;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 5px;
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
  overflow-x: scroll;


  .park-list {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 20px;

    .park-item {
      display: flex;
      justify-content: space-between;

      .park-item-name-top {
        width: 100%;
        height: 32px;
        color: #1296db;
      }

      .park-item-name-bottom {
        font-size: 18px;
        margin-top: 3px;
      }

    }
  }
}

.park-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari 和 Opera */
}

.add-parking-space {
  position: fixed;
  bottom: 60px;
  width: 50px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
}


</style>
