import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import user from '@/views/user'
import seat from '@/views/seat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: user,
  },
  {
    path: '/seat',
    name: 'seat',
    component: seat,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router