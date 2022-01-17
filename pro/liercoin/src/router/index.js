import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../page/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/mine',
    component: () => import('../page/mine.vue')
  },
  {
    path: '/store',
    component: () => import('../page/store.vue')
  },
  {
    path: '/login',
    component: () => import('../page/login.vue')
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
