import Vue from 'vue'
import Router from 'vue-router'
import Home from '@layout/Home'

// 重写路由的push方法
const routerPush = Router.prototype.push
Router.prototype.push = function push(location){
    return routerPush.call(this,location).catch(error => error)
}

Vue.use(Router)

export default new Router({
    router:[
      {
        path:'/',
        name:'Login',
        component:()=>import('@/test'),
        meta:{title:'登录页'}
      },
      {
        path:'/login',
        name:'Login',
        component:()=>import('@/test'),
        meta:{title:'登录页'}
      }
    ]
})