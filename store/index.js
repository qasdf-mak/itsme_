import Vue from 'vue'
import Vuex from 'vuex'

import page from './page/'
import user from './user/'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { // 做模块化处理,每个功能一个store.js文件,然后统一在这边引入
    page,
    user
  }
})

export default store
