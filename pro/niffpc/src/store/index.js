import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      account:'',
      user_hd:1,
      is_truely:0,
      nikname:'',
      id:''
    },
    keywords:'',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
