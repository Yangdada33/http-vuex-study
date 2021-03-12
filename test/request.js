import axios  from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import router from '@/router'
import _, { reject } from 'lodash'  //防抖-->lodash 库
import { config } from 'node:process'

if(process.env.NODE_ENV === 'development'){
    axios.defaults.baseURL = 'http://30.118.18.90' // 需要连接的服务器
    //...
}

//create an axios instance
const service = axios.create({
    headers:{
        'Conttent-Type':'application/json'
    },
    // withCredentials : true, //send cookies when cross-domain requests
    timeout:60000  //request  timeout
    // transformRequest : function (data){
    //     return qs.stringify(data)
    // }
})

service.interceptors.request.use(
    config =>{
        const token = window.localStorage.getItem('token')
        if(token){
            config.headers['token'] = token
        }
        config.url = '/dt' + config.url

        return config
    },
    error =>{
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response =>{
        if(response.config.headers.token){
            localStorage.setItem('token',response.config.headers.token)
        }
        const res = response.data
        if(res.code !== 200){
            if(res.code === 401){
                Message({
                    message : res.msg || '很抱歉。。。。重新登陆',
                    type:'error',
                    duration : 3000
                })

                return router.push('/login')
            }else if (res.code === 500 || res.code ===501){
                Message({
                    message:res.msg || '服务器出错，请稍后再试',
                    type:'error',
                    duration : 3000
                })
            }else if(res.code === 6007 || res.code === 6008 || res.code === 6009 || res.code === 6100 || res.code === 6101){
                Message({
                    message:res.msg,
                    type:'warning',
                    duration : 3000
                })
                return res
            } else {
                Message({
                    message : res.msg || 'Error',
                    type:'error',
                    duration:3000
                })
                // 这边也是要有返回码的 需要后端提供
                return Promise.reject(new Error(res.msg || 'Error'))
            }
        }else{
            return res
        }
    },
    _.debounce(error =>{
        if(error && error.response && error.response.data && error.response.data.code == 401){
            Message({
                message:'长时间未登录，重新登录',
                type:'error',
                duration:3000
            })
            return Promise.reject(error)
        }
    },500)
)

export default service