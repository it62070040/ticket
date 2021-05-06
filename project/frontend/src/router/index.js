import Vue from 'vue'
import VueRouter from 'vue-router'

import user from '@/views/user'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/:id',
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
    path: '/update/:id',
    name: 'updateConcert',
    meta: { login: true},
    component: () => import('../views/updateConcert.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/detailConcert.vue')
  },
  {
    path: '/step1/:id',
    name: 'step1',
    meta: { login: true},
    component: () => import('../views/step1.vue')
  },
  {
    path: '/step2/:id',
    name: 'step2',
    meta: { login: true},
    component: () => import('../views/step2.vue')
  },
  {
    path: '/step3/:id',
    name: 'step3',
    meta: { login: true},
    component: () => import('../views/step3.vue')
  },
  {
    path: '/step4/:id',
    name: 'step4',
    meta: { login: true},
    component: () => import('../views/step4.vue')
  },
  {
    path: '/paymentform/:id',
    name: 'paymentform',
    meta: {login: true},
    component: ()  => import('../views/paymentform.vue')
  },
  {
    path: '/myconcert/:id',
    name: 'myconcert',
    meta: {login: true},
    component: ()  => import('../components/myconcert.vue')
  },
  {
    path:'/paymentimg/:id',
    name: 'paymentimg',
    component: () => import("../views/paymentimg.vue")
  }

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