<template>
  <div class="container">
    <el-card style="width: 80%; height: 500px; margin-top: 80px">
      <template #header>
        <div class="card-header">
          <span>车位管理页面</span>
        </div>
      </template>
      <el-table :data="tableData" height="400" style="width: 100%">
        <el-table-column #default="scope" label="地址" width="250">
          <span style="margin-left: -12px">{{ scope.row.addressDescription }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="区域" width="200">
          <el-tag>{{ scope.row.parkNumber }}</el-tag>
        </el-table-column>
        <el-table-column #default="scope" label="车位图片" width="200">
          <img :src="scope.row.parkPhoto" alt="" style="width: 50px; height: 50px;"/>
        </el-table-column>
        <el-table-column #default="scope" label="价格类型" width="200">
          <span>{{
              scope.row.priceType == 1 ? '天' :
                  scope.row.priceType == 2 ? "小时" : '自定义'
            }}
          </span>
        </el-table-column>
        <el-table-column #default="scope" label="价格" width="200">
          <span>{{ scope.row.price }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="创建时间" width="230">
          <span>{{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm') }}</span>
        </el-table-column>

        <el-table-column #default="scope" label="操作" width="230">
          <el-button
              plain
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import dayjs from 'dayjs'; // 引入 dayjs
import {ElMessage, ElMessageBox} from 'element-plus'
import {deleteParkingSpaceUsingPost, listParkingSpaceByPageUsingPost} from "../api/parkingSpaceController.ts";
import User = API.User;
import ParkingSpace = API.ParkingSpace;


const handleDelete = (row: User) => {
  ElMessageBox.confirm(
      '是否删除此车位?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        const res = await deleteParkingSpaceUsingPost({
          id: row.id,
        });
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败',
          })
        }
        await getList();
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const getList = async () => {
  const res = await listParkingSpaceByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    longitude: 114.418375,
    latitude: 23.037879,
  });
  if (res.code === 0) {
    tableData.value = res.data.records;
  }
};

onMounted(async () => {
  await getList();
})

const tableData = ref<ParkingSpace[]>([])
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
s