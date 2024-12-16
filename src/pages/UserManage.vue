<template>
  <div class="container">
    <el-card style="width: 80%; height: 500px; margin-top: 80px">
      <template #header>
        <div class="card-header">
          <span>用户管理页面</span>
        </div>
      </template>
      <el-table :data="tableData" height="400" style="width: 100%">
        <el-table-column #default="scope" label="手机号" width="230">
          <span style="margin-left: -12px">{{ scope.row.phone }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="昵称" width="230">
          <el-tag style="margin-left: -7px">{{ scope.row.name }}</el-tag>
        </el-table-column>
        <el-table-column #default="scope" label="头像" width="230">
          <img :src="scope.row.avatar" alt="" style="width: 50px; height: 50px;margin-left: -7px"/>
        </el-table-column>
        <el-table-column #default="scope" label="用户类型" width="230">
          <el-tag style="margin-left: -7px">{{ scope.row.roleType == 2 ? '管理员' : '用户' }}</el-tag>
        </el-table-column>
        <el-table-column #default="scope" label="创建时间" width="230">
          <span style="margin-left: -7px">{{ dayjs(scope.row.registerTime).format('YYYY-MM-DD HH:mm') }}</span>
        </el-table-column>
        <el-table-column #default="scope" label="操作" width="230">
          <el-button size="small" style="margin-left: -10px" @click="handleEdit(scope.row)">
            编辑
          </el-button>
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
    <el-drawer
        v-model="dialog"
        :before-close="handleClose"
        class="demo-drawer"
        direction="rtl"
        title="编辑"
    >
      <div class="demo-drawer__content">
        <el-form :model="user">
          <el-form-item :label-width="formLabelWidth" label="名称">
            <el-input v-model="user.name" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="头像">
            <img :src="user.avatar" alt="" style="height: 48px; width: 48px;"/>
            <el-input v-model="user.avatar" autocomplete="off" style="margin-top: 10px"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="类型">
            <!--            <el-input v-model="user.roleType" autocomplete="off"/>-->
            <el-select
                v-model="user.roleType"
                placeholder="选择用户类型"
            >
              <el-option :value="1" label="用户"/>
              <el-option :value="2" label="管理员"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button :loading="loading" type="primary" @click="onClick">
            {{ loading ? '正在提交 ...' : '提交' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {deleteUserUsingDelete, listUserByPageUsingPost, updateUserUsingPost} from "../api/userController.ts";
import dayjs from 'dayjs'; // 引入 dayjs
import {ElMessage, ElMessageBox} from 'element-plus'
import User = API.User;

const formLabelWidth = '80px'
let timer: any = null

const dialog = ref(false)
const loading = ref(false)

const user = reactive({
  id: 0,
  name: '',
  avatar: '',
  roleType: 0,
});

const handleEdit = (row: User) => {
  dialog.value = true;
  user.id = row.id;
  user.name = row.name;
  user.avatar = row.avatar;
  user.roleType = row.roleType;
}

const handleDelete = (row: User) => {
  ElMessageBox.confirm(
      '是否删除此用户?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        const res = await deleteUserUsingDelete({
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
  const res = await listUserByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    userName: '',
  });
  if (res.code === 0) {
    tableData.value = res.data.records;
  }
};

const updateUser = async () => {
  const res = await updateUserUsingPost(user);
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    })
  }
  await getList();
}

const onClick = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    dialog.value = false
  }, 400)
  await updateUser()
}

const handleClose = () => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('是否需要提交?', {
    distinguishCancelAndClose: true,
    confirmButtonText: '提交',
    cancelButtonText: '取消',
  })
      .then(async () => {
        loading.value = true
        timer = setTimeout(() => {
          // 动画关闭需要一定的时间
          setTimeout(() => {
            dialog.value = false
          }, 400)
        }, 2000)
        await updateUser()
      })
      .catch(() => {
        // catch error
      })
}


const cancelForm = () => {
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
}

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
