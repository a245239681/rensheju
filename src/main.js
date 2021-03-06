/* eslint-disable standard/object-curly-even-spacing */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/js/rem'
import './assets/css/reset.css'
import './assets/css/border.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import routers from '@/utils/routers'
import apiAjax from '@/utils/http'
import { Button, NavBar, Search, Row,
  Col, Icon, Tabbar, TabbarItem, Divider,
  Image, Popup, Area, PullRefresh, Toast, Field, CellGroup, Cell,
  DropdownMenu, DropdownItem, AddressEdit, RadioGroup, Radio, Form } from 'vant'
Vue.use(Button).use(NavBar).use(Search)
  .use(Row).use(Col).use(Icon).use(Tabbar)
  .use(TabbarItem).use(Divider).use(Image).use(Popup).use(Area)
  .use(PullRefresh).use(Toast).use(Field).use(CellGroup)
  .use(DropdownMenu).use(DropdownItem).use(AddressEdit).use(RadioGroup).use(Radio).use(Form).use(Cell)

Vue.config.productionTip = false

Vue.prototype.$token = routers
Vue.prototype.$http = apiAjax
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// // 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
// Vue.prototype.$http = axios

// // 一些默认的参数
// axios.defaults.baseURL = 'http://api.gxrswx.healthan.net'
// debugger
// // 请求拦截器：在发送请求前拦截
// axios.interceptors.request.use(config => {
//   // console.log('请求发送前拦截')
//   let token = localStorage.getItem('Zp-Token')
//   // console.log(token)
//   config.headers.common['Zp-Token'] = token
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// // 响应拦截器：在请求响应之后拦截
// axios.interceptors.response.use(response => {
//   // console.log('请求响应后处理')
//   return response
// }, error => {
//   return Promise.reject(error)
// })
