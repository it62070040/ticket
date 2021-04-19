import Vue from 'vue'
import VueRouter from 'vue-router'

import user from '@/views/user'
import seat from '@/views/seat'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
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
  {
    path: '/create',
    name: 'createConcert',
    component: () => import('../views/createConcert.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router