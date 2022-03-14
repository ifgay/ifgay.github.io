import Vue from 'vue'
import VueRouter from 'vue-router'
import fe from '../views/fe.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: to => {
      return 'fe'
    }
  },
  {
    path: '/fe',
    name:'fe',
    component:fe
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
    path: '/chat',
    name: 'chat',
    component: () => import('../views/chat.vue')
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
  },
  {
    path:'/download',
    name: 'download',
    component: () => import('../views/download.vue')
  },
  {
    path:'/report',
    name: 'report',
    component: () => import('../views/report.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
