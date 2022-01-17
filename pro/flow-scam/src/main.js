import Vue from 'vue'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.host='http://39.108.216.184/index.php/api/flow/'
Vue.prototype.publicPath='http://39.108.216.184'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
