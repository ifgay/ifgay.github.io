import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    navBarConf:{
      title:"",
      leftText:'',
      rightText:'',
      clickLeft:()=>{
        router.go(-1)
      },
      leftArrow:false,
      clickRight:()=>{
      }
    }
  },
  mutations: {
    setNavConf(state,confFrom){
      state.navBarConf.title=confFrom.title
      state.navBarConf.leftText=confFrom.leftText
      state.navBarConf.rightText=confFrom.rightText
      state.navBarConf.leftArrow=confFrom.leftArrow
      state.navBarConf.clickRight=confFrom.clickRight
      return state
    }
  },
  actions: {
  },
  modules: {
  }
})
