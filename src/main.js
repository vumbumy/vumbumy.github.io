import Vue from 'vue'
import App from './App.vue'

import vuetify from '@/plugins/vuetify' // path to vuetify export

import router from './router';
import store from "./store"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
})
    .$mount('#app')
