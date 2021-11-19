import Vue from 'vue'
import App from './App.vue'


import CountryFlag from '../node_modules/vue-country-flag'
Vue.component(CountryFlag)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
