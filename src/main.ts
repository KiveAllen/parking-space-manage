import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from "./config/route.ts";
import * as VueRouter from 'vue-router';
import {createPinia} from "pinia";


const app = createApp(App);

app.use(Vant);

const pinia = createPinia();
app.use(pinia)

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})
app.use(router)

app.mount('#app')
