import Vue from 'vue'
import App from './App.vue'
import IviewForm from '../lib/form-plugin.umd'
Vue.use(IviewForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')