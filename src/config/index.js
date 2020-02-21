
const dev = true // false是本地开发，true是坏境发布
// const api_url=dev?'http://admin.chejy.cn:80': 'http://admin.chejy.cn:80'  //'http://localhost:3577' //false是本地环境api地址,true是线上api地址
const apiUrls = dev ? 'http://api.gxrswx.healthan.net' : 'http://localhost:8080' // false是本地环境api地址,true是线上api地址
const apiurl = dev ? apiUrls : 'api'

export default {
  apiurl
}
