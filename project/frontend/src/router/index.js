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
    meta: { login: true},
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
    meta: { login: true},
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
    meta: { login: true},
    component: seathotel, 
  }, 
  { 
    path: '/hotel_K', 
    name: 'hotel_K', 
    meta: { login: true},
    component: hotel_K, 
  }, 
  { 
    path: '/choosepayment', 
    name: 'choosepayment', 
    meta: { login: true},
    component: choosepayment, 
  }, 
  { 
    path: '/payment', 
    name: 'payment', 
    meta: { login: true},
    component: payment, 
  },
  {
    path: '/step1/:id',
    name: 'step1',
    component: () => import('../views/step1.vue')
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/'})
  }

  next()
})
export default router