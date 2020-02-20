
// import Vue from 'vue'
import axios from 'axios'
import router from '../router'
// 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
// Vue.prototype.$http = axios
// 一些默认的参数
axios.defaults.baseURL = 'http://gxrswx.healthan.net'
// 请求拦截器：在发送请求前拦截
axios.interceptors.request.use(config => {
// console.log('请求发送前拦截')
  let token = localStorage.getItem('Zp-Token')
  if (token === null) {
    token = ''
  }
  config.headers.common['Zp-Token'] = token
  return config
}, error => {
  return Promise.reject(error)
})
var code = ''
const userToken = 'Zp-Token'
function getToken () {
  let token = localStorage.getItem(userToken)
  if (token === undefined || token === null || token === '') {
    getCode()
  }
  return token
};

function setToken (token) {
  localStorage.setItem(userToken, token)
};

/**
    * 非静默授权，第一次有弹框
    */
function getCode () { // 非静默授权，第一次有弹框
  code = ''
  let local = window.location.href // 获取页面url
  local = local.split('//')
  console.log(local[1])
  code = getUrlCode().code // 截取code
  if (code == null || code === '') { // 如果没有code，则去请求
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc57a9c66a8a88bdf&redirect_uri=http://gxrswx.healthan.net/Access/home/getCode&response_type=code&scope=snsapi_base&state=' + local[1] + '&#wechat_redirect'
  } else {
    /**
     * 获取Token
    */
    getTokens()
  }
}
/**
 * 截取url中的code方法
 */
function getUrlCode () {
  var url = location.search
  // this.winUrl = url
  var theRequest = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  }
  return theRequest
};

function getTokens () {
  axios.post('/Access/home/getToken', {
    dateTime: new Date().getTime(),
    method: 'getToken',
    sign: '422121c4dfdfce667689dcd68aae0662',
    data: {
      code: code
    }
  }).then(res => {
    if (res.data.code === '0') {
      setToken(res.data.data.token)
    }
    if (res.data.code === '-2') {
      router.push('/Register')
    }
  }).catch(res => {
    console.log(res)
  })
}
export default {
  getToken: getToken,
  setToken: setToken
}
