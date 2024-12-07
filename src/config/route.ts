import Index from "../pages/Index.vue";
import Part from "../pages/Park.vue";
import User from "../pages/User.vue";
import Order from "../pages/Order.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import PartAdd from "../pages/ParkAdd.vue";
import PartUpdate from "../pages/ParkUpdate.vue";
import PartDetail from "../pages/ParkDetail.vue";
import OrderDetail from "../pages/OrderDetail.vue";
import OrderAdd from "../pages/OrderAdd.vue";

const routes = [
    {path: '/', redirect: '/user/login'},
    {path: '/index', title: '主页', component: Index},
    {path: '/park', title: '车位信息', component: Part},
    {path: '/park/add', title: '添加车位', component: PartAdd},
    {path: '/park/detail', title: '车位详情', component: PartDetail},
    {path: '/park/update', title: '添加车位', component: PartUpdate},
    {path: '/order', title: '订单信息', component: Order},
    {path: '/order/add', title: '预定车位', component: OrderAdd},
    {path: '/order/detail', title: '订单详细信息', component: OrderDetail},
    {path: '/user', title: '个人信息', component: User},
    {path: '/user/login', title: '私家车车位共享', component: UserLoginPage},
    {path: '/user/update', title: '修改个人信息', component: UserUpdatePage},
]

export default routes;
