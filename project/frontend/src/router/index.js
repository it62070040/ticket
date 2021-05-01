import Vue from 'vue'
import VueRouter from 'vue-router'

import user from '@/views/user'
// import seatunion from '@/views/seatunion' 
// import { component } from 'vue/types/umd' 
import seathotel from '@/views/seathotel' 
import hotel_K from '@/views/hotel_K' 
import choosepayment from '@/views/choosepayment' 
import payment from '@/views/payment' 


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: user,
  },
   // { 
  //   path: '/seatunion', 
  //   name: 'seatunion', 
  //   component: seatunion, 
  // }, 
  {
    path: '/create',
    name: 'createConcert',
    component: () => import('../views/createConcert.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/detailConcert.vue')
  },
  { 
    path: '/seathotel', 
    name: 'seathotel', 
    component: seathotel, 
  }, 
  { 
    path: '/hotel_K', 
    name: 'hotel_K', 
    component: hotel_K, 
  }, 
  { 
    path: '/choosepayment', 
    name: 'choosepayment', 
    component: choosepayment, 
  }, 
  { 
    path: '/payment', 
    name: 'payment', 
    component: payment, 
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router