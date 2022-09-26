import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import AxiosPlugin from 'vue-axios-cors';

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(AxiosPlugin)
// axios.defaults.baseURL = 'http://localhost:3000/api';
// axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = process.env.API_URL || 'https://phone-book-api-cr.herokuapp.com/api';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
