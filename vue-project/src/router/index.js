import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import user from '@/views/user'
import seat from '@/views/seat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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

  ],
})
