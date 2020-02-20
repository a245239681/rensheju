
import Vue from 'vue'
import axios from 'axios'
// 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
Vue.prototype.$http = axios

// 一些默认的参数
axios.defaults.baseURL = 'http://api.gxrswx.healthan.net/Api'

// 请求拦截器：在发送请求前拦截
axios.interceptors.request.use(config => {
  // console.log('请求发送前拦截')
  let token = localStorage.getItem('userToken')
  config.headers.common['Zp-Token'] = token
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器：在请求响应之后拦截
axios.interceptors.response.use(response => {
  // console.log('请求响应后处理')
  return response
}, error => {
  return Promise.reject(error)
})
export default {

}
