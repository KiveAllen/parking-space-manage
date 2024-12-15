import UserLoginPage from "../pages/UserLoginPage.vue";
import ParkManage from "../pages/ParkManage.vue";
import OrderManage from "../pages/OrderManage.vue";
import UserManage from "../pages/UserManage.vue";

const routes = [{path: '/', redirect: '/user/login'}, {
    path: '/user/login',
    title: '私家车车位共享',
    component: UserLoginPage
}, // 车位管理
    {path: '/park/manage', title: '车位管理', component: ParkManage}, // 订单管理
    {path: '/order/manage', title: '订单管理', component: OrderManage}, // 用户管理
    {path: '/user/manage', title: '用户管理', component: UserManage},]

export default routes;
