import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.host='http://localhost/index.php/niffpc/'
Vue.prototype.publicPath='http://39.108.216.184'
Vue.prototype.axios=axios

Vue.prototype.updateUserInfo=(that)=>{
  that.axios.get(that.host + "index/get_user_info").then((res) => {
    if (res.success) {
      that.$store.state.userInfo = res.data;
    }
  });
}

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
