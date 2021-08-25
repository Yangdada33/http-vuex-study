/**
*掩码
*@param{String} str 需要掩码的字符串
*@param{Nunber} frontNum 前面保留位数
*@param{Number} behindNum 后面保留位数
*/
export function Mask(str,frontNum,behindNum){
  if(str!=null && str!=undefined){
    let len = str.length - frontNum - behindNum
    let star = ''
    for(let i=0;i<len;i++){
      star += '*'
    }
    return str.substring(0,frontNum)+star+str.substring(str.length-behindNum)
  }else{
    return ''
  }
}

/**
*判断第一个是否为中文
*@param{String} str 参数
*/
export function Chinese(str){
  let re = new RegExp('^[\u4e00-\u9fa5]')
  if(re.test(str)){
    return true
  }else{
    return false
  }
}

/**
*下载exvel,处理后台返回的文件流,不同浏览器
*/
export function downLoadHandle(res,fileName){
  let blob
  const link = document.createElement('a')
  if(!!window.ActiveXObject || 'ActiveXObject' in window){  //IE
    blob = new Blob([res],{type:'text/plain'})
    window.navigator.msSaveBlob(blob,fileName)
  }else{
    blob = new Blob([res],{type:'application/octet-stream'})
    link.download = fileName
  }
  link.href = window.URL.createObjectURL(blob)
  link.click()
}

