import service from './request'
import api from './api'
import { resolve } from 'node:path'
import { reject } from 'lodash'

/**
 * @param {*} requestName 请求名称 --api.js 中配置
 * @param {*} params      请求参数
 * @param {*} extraUrl    接口url 由后台动态提供
 */

function http (requestName , params = {} , extraUrl = ''){
    //嵌套API
    const requestKeyArr = String(requestName).split('/')
    const moduleName = requestKeyArr.length > 1 ? requestKeyArr[0] : ''
    const modulePath = requestKeyArr.length > 1 ? requestKeyArr[1] : ''
    const httpConfigs = moduleName ? api[moduleName] : {}
    const httpConfig = modulePath ? httpConfigs[modulePath] : {}
    const url = httpConfig.isMock ? httpConfig.mockUrl : extraUrl ? httpConfig.url + extraUrl : httpConfig.url
    const method = httpConfig.method
    const responseType = httpConfig.responseType ? httpConfig.responseType : 'json'

    const key = (method === 'post' || method === 'put') ? 'data' : 'params'
    return new Promise((resolve,reject) =>{
        service({
            method,
            url,
            responseType,
            [key] : params
        })
          .then((res)=>{
              resolve(res)
          })
          .catch((err) =>{
              reject(err)
          })
    })
}

export default http
