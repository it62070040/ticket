import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'

library.add(fas)

Vue.component('icon', FontAwesomeIcon)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,  // add router here
  render: h => h(App),
}).$mount('#app')
