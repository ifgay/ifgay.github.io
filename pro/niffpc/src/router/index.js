import Vue from 'vue'
import VueRouter from 'vue-router'
import download from '../views/download.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: to => {
      return 'download'
    }
  },
  {
    path: '/download',
    name:'download',
    component:download
  },
  {
    path: '/readme',
    name: 'readme',
    component: () => import('../views/readme.vue')
  },
  {
    path: '/script',
    name: 'script',
    component: () => import('../views/script.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('../views/update.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting.vue')
  },
  {
    path: '/appview',
    name: 'appview',
    component: () => import('../views/appview.vue')
  },
  {
    path: '/mic',
    name: 'mic',
    component: () => import('../views/mic.vue')
  },
  {
    path:'/user',
    name: 'user',
    component: () => import('../views/user.vue')
  },
  {
    path:'/pay',
    name: 'pay',
    component: () => import('../views/pay.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
