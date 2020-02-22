
// import Vue from 'vue'
import axios from 'axios'
import router from '../router'

var code = ''
const userToken = 'Zp-Token'
function getToken () {
  let token = localStorage.getItem(userToken)
  if (token === undefined || token === null || token === '') {
    getCode()
  }
  return token
};

function setItem (key, value) {
  localStorage.setItem(key, value)
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
  if (code == null || code === '' || code === undefined) { // 如果没有code，则去请求
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
  let token = localStorage.getItem('Zp-Token') || ''
  axios({
    method: 'POST',
    url: 'http://gxrswx.healthan.net/Access/home/getToken',
    data: {
      dateTime: new Date().getTime(),
      method: 'getToken',
      sign: '422121c4dfdfce667689dcd68aae0662',
      data: {
        code: code
      }
    },
    withCredentials: false,
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Zp-Token': token}
  }).then(res => {
    if (res.data.code === '0') {
      setItem('Zp-Token', res.data.data.token)
      setItem('userName', res.data.data.aac003)
      setItem('idCard', res.data.data.aac002)
    }
    if (res.data.code === '-2') {
      router.push({
        name: 'Register',
        params: {
          token: res.data.data.token
        }
      })
    }
  }).catch(res => {
    console.log(res)
  })
}
export default {
  getToken: getToken,
  setToken: setItem
}
