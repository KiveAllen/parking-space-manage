<template>
  <div class="container">
    <el-card style="width: 80%; height: 500px; margin-top: 80px">
      <template #header>
        <div class="card-header">
          <span>用户管理页面</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column #default="scope" label="手机号" width="200">
          <span style="margin-left: -12px">{{ scope.row.phone }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="昵称" width="200">
          <el-tag style="margin-left: -7px">{{ scope.row.name }}</el-tag>
        </el-table-column>
        <el-table-column #default="scope" label="头像" width="200">
          <img :src="scope.row.avatar" alt="" style="width: 50px; height: 50px;margin-left: -7px"/>
        </el-table-column>
        <el-table-column #default="scope" label="用户类型" width="200">
          <el-tag style="margin-left: -7px">{{ scope.row.roleType == 2 ? '管理员' : '用户' }}</el-tag>
        </el-table-column>
        <el-table-column #default="scope" label="创建时间" width="200">
          <span style="margin-left: -7px">{{ scope.row.registerTime }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="操作" width="200">
          <el-button size="small" style="margin-left: -10px" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </el-table-column>
      </el-table>

      <el-pagination
          :page-size="10"
          :pager-count="2"
          :total="500"
          background
          class="pagination"
          layout="prev, pager, next"
      />
    </el-card>
  </div>

</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {listUserByPageUsingPost} from "../api/userController.ts";
import User = API.User;

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(50)
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

onMounted(() => {
  const res = listUserByPageUsingPost({
    pageNum: 1,
    pageSize: 10
  });

})


const tableData: User[] = [
  {
    registerTime: '2016-05-03',
    phone: '13812345678',
    name: 'Tom',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    roleType: 1
  },
  {
    registerTime: '2016-05-03',
    phone: '13923456789',
    name: 'Admin',
    avatar: 'https://www.mianshiya.com/_next/image?url=%2Flogo.png&w=32&q=75',
    roleType: 2
  }
]
</script>

<style scoped>.container {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.pagination {
  margin-top: 20px;
  margin-left: 70%;
}
</style>