import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import moment from 'moment';

Vue.prototype.moment = moment;
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
