import Vue from 'vue'
import App from './App.vue'


import CountryFlag from '../node_modules/vue-country-flag'
Vue.component(CountryFlag)


import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



library.add(faUserSecret)
library.add(faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
