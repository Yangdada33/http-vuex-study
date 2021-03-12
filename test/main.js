 import http from './http'
 import router from './router'
 import store from './store'

 Vue.prototype.$http = http

 new Vue({
     el:'#app',
     router,
     store,
     components:{
         App
     },
     template:'<App/>'

 })