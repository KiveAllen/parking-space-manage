<template>
  <div class="container">
    <el-card style="width: 80%; height: 500px; margin-top: 80px">
      <template #header>
        <div class="card-header">
          <span>订单管理页面</span>
        </div>
      </template>
      <el-table :data="tableData" height="400" style="width: 100%">
        <el-table-column #default="scope" label="订单号" width="150">
          <span>{{ scope.row.id }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="车位地址" width="230">
          <span style="margin-left: -12px">{{ scope.row.name }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="车位图片" width="150">
          <img :src="scope.row.parkingSpacePhoto" alt="" style="width: 50px; height: 50px;"/>
        </el-table-column>
        <el-table-column #default="scope" label="拥有者" width="150">
          <span>{{ scope.row.ownerName }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="租用者" width="150">
          <span>{{ scope.row.userName }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="总费用" width="150">
          <span>{{ scope.row.totalCost }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="起始时间" width="150">
          <span style="margin-left: -7px">{{ dayjs(scope.row.reservationTimeStart).format('YYYY-MM-DD') }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="结束时间" width="150">
          <span style="margin-left: -7px">{{ dayjs(scope.row.reservationTimeEnd).format('YYYY-MM-DD') }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="订单状态" width="150">
          <!--          预订状态，1: 已预订, 2: 已取消, 3: 已完成-->
          <el-tag v-if="scope.row.reservationStatus === 1" type="primary">已预订</el-tag>
          <el-tag v-else-if="scope.row.reservationStatus === 2" type="warning">已取消</el-tag>
          <el-tag v-else-if="scope.row.reservationStatus === 3" type="success">已完成</el-tag>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import dayjs from 'dayjs'; // 引入 dayjs
import {listReservationByPageUsingPost} from "../api/reservationController.ts";
import User = API.User;


const getList = async () => {
  const res = await listReservationByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
  });
  if (res.code === 0) {
    tableData.value = res.data.records;
  }
};


onMounted(async () => {
  await getList();
})

const tableData = ref<User[]>([])
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.pagination {
  margin-top: 20px;
  margin-left: 70%;
}
</style>
