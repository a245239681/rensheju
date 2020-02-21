
import Vue from 'vue'
import axios from 'axios'
import indexjs from '@/config/index.js'
import { Toast } from 'vant'
Vue.use(Toast)
const apiurl = indexjs.apiurl

function ajaxPost (url, params, callfunc, async) {
  let userToken = getToken() || ''
  axios({
    method: 'POST',
    url: apiurl + url,
    data: params,
    withCredentials: async,
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Zp-Token': userToken}
  })
    .then(function (result) {
      if (callfunc) {
        callfunc(result)
      }
    }).catch(function () {
      Toast('系统异常,请重试!')
    })
};

function getToken () {
  return localStorage.getItem('Zp-Token')
};

export default {
  postJson: function (url, params, callfunc, async) {
    let call = arguments[2] || null
    let asyncAjax = arguments[3] || false
    ajaxPost(url, params, call, asyncAjax)
  }
}
