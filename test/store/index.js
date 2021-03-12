import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
    //模块化
    modules:{
        app
    }
})
