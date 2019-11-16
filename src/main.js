import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import API from './API/API'
import './plugins/element.js'

Vue.prototype.$API = API

Vue.use(BaiduMap, {
  ak: 'bkBn8PPiqvq85NiaNv5KMG99WjkzOa8i'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
