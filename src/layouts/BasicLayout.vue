<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <img
        alt="Element logo"
        src="../../public/car.svg"
        style="width: 55px; margin-left: 20px; margin-right: 20px"
    />
    <el-menu-item index="用户管理" route="/user/manage">用户管理</el-menu-item>
    <el-menu-item index="车位管理" route="/park/manage">车位管理</el-menu-item>
    <el-menu-item index="订单管理" route="/order/manage">订单管理</el-menu-item>
  </el-menu>
  <div id="content">
    <router-view/>
  </div>

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

const router = useRouter();

const activeIndex = ref('用户管理');

const handleSelect = (index: string) => {
  // 根据索引找到对应的路由
  const route = routes.find((r) => r.title === index);
  if (route && route.path) {
    router.push(route.path);
  }
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
