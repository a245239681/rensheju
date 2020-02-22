<template>
  <div class="login">
      <form ref="form">
        <van-cell-group>
        <van-field v-model="idcards"  class="input-list" label="身份证号码" required placeholder="请输入身份证号码" />
        </van-cell-group>
        <van-cell-group>
        <van-field v-model="name" class="input-list" label="姓名" required placeholder="请输入姓名" />
        </van-cell-group>
        <van-cell-group class="input-list">
            <div role="button" tabindex="0" @click="showPopup" class="van-cell van-cell--clickable van-field van-cell--required">
                <div class="van-cell__title van-field__label">
                    <span>性别</span>
                </div>
                <div class="van-cell__value">
                    <div class="van-field__body">
                        <input type="text" placeholder="请选择性别" v-model="gender.sex" readonly="readonly" class="van-field__control">
                        <div class="van-field__right-icon">
                            <i class="van-icon van-icon-arrow"><!----></i>
                        </div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group class="input-list">
            <div role="button" tabindex="0" @click="showPopupEdu" class="van-cell van-cell--clickable van-field van-cell--required">
                <div class="van-cell__title van-field__label">
                    <span>文化程度</span>
                </div>
                <div class="van-cell__value">
                    <div class="van-field__body">
                        <input type="text" placeholder="选择文化程度" v-model="education.edu"  readonly="readonly" class="van-field__control">
                        <div class="van-field__right-icon">
                            <i class="van-icon van-icon-arrow"><!----></i>
                        </div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group class="input-list">
            <div role="button" tabindex="0" @click="showPopupAddress" class="van-cell van-cell--clickable van-field van-cell--required">
                <div class="van-cell__title van-field__label">
                    <span>户籍地址</span>
                </div>
                <div class="van-cell__value">
                    <div class="van-field__body">
                        <input type="text" placeholder="选择户籍地址" v-model="aab301"  readonly="readonly" class="van-field__control">
                        <div class="van-field__right-icon">
                            <i class="van-icon van-icon-arrow"><!----></i>
                        </div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group class="input-list">
            <div role="button" @click="showCommonly" tabindex="0" class="van-cell van-cell--clickable van-field van-cell--required">
                <div class="van-cell__title van-field__label">
                    <span>常用地址</span>
                </div>
                <div class="van-cell__value">
                    <div class="van-field__body">
                        <input type="text" placeholder="选择常用地址" v-model="yac100"   readonly="readonly" class="van-field__control">
                        <div class="van-field__right-icon">
                            <i class="van-icon van-icon-arrow"><!----></i>
                        </div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group>
        <van-field v-model="phonenumber" type="number"  class="input-list" label="联系电话" required placeholder="请输入联系电话" />
        </van-cell-group>
        <van-cell-group>
        <van-field v-model="password" type="password" class="input-list" label="登录密码" required placeholder="请输入登录密码" />
        </van-cell-group>

        <div class="sub-btn">
            <van-button native-type='button'  class="button-large" @click="submitForm()"  color="#767dff" size="large">注册</van-button>
            <p class="mt20">已有账号？<a href="javascript:;" @click="toLogin">立即登录</a></p>
        </div>
      </form>

    <!-- 性别弹框 -->
    <div>
        <van-popup v-model="show" van-picker
        position="bottom"
        :style="{ height: '50%' }">
        <div class="van-hairline--top-bottom van-picker__toolbar">
            <button type="button" class="van-picker__cancel" @click="sexCancel">取消</button>
            <div class="van-ellipsis van-picker__title">选择性别</div>
            <button type="button" class="van-picker__confirm" @click="sexDetermine">确认</button>
        </div>
         <van-radio-group v-model="radioSex">
            <van-cell-group>
                <van-cell v-for="(item, inx) in sex" :key='inx' :title='item.sex' clickable @click="sexClick(item)">
                   <van-radio slot="right-icon" :name="item.value"  />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        </van-popup>
    </div>
    <!-- 文化程度弹框 -->
    <div>
        <van-popup v-model="showEdu" van-picker
        position="bottom" class="edu"
        :style="{ height: '50%' }">
        <div class="van-hairline--top-bottom van-picker__toolbar ">
            <button type="button" class="van-picker__cancel" @click="eduCancel">取消</button>
            <div class="van-ellipsis van-picker__title">选择文化程度</div>
            <button type="button" class="van-picker__confirm" @click="eduDetermine">确认</button>
        </div>
         <van-radio-group v-model="radioEdu" class="edu-text">
            <van-cell-group>
                <van-cell v-for="(item, inx) in edu" :key='inx' :title='item.edu' clickable @click="eduClick(item)">
                   <van-radio slot="right-icon" :name="item.value"  />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        </van-popup>
    </div>
    <div>
      <!-- 户籍地区弹框 -->
      <van-popup
        v-model="shows"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-area :area-list="areaList" :columns-num="2" value="450100" ref="myArea" cancel-button-text='取消'
         title="选择户籍地区" @change="onChange" @confirm="onConfirm" @cancel="onCancel"/>
      </van-popup>
    </div>
    <div>
      <!-- 常住地区弹框 -->
      <van-popup
        v-model="showAddress"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-area :area-list="areaList" :columns-num="2" value="450100" ref="myArea" cancel-button-text='取消'
         title="选择常住地区" @change="commonlyChange" @confirm="commonlyConfirm" @cancel="commonlyCancel"/>
      </van-popup>
    </div>
  </div>
</template>

<script>
import footerBar from '@/components/footer_bar'
import Vue from 'vue'
// import axios from 'axios'
import areaList from '@/assets/js/area'
import { Toast } from 'vant'
Vue.use(Toast)

// // 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
// Vue.prototype.$http = axios

// // 一些默认的参数
// axios.defaults.baseURL = 'http://gxrswx.healthan.net'
// // 请求拦截器：在发送请求前拦截
// axios.interceptors.request.use(config => {
//   // console.log('请求发送前拦截')
//   config.headers.common['Zp-Token'] = 'token'
//   return config
// }, error => {
//   return Promise.reject(error)
// })
export default {

  data () {
    return {
      idcards: '', // 身份证
      name: '', // 姓名
      gender: {sex: '', value: ''}, // 性别
      education: {edu: '', value: ''}, // 学历
      aab301: '', // 户籍地址
      yac100: '', // 常住地址
      phonenumber: '', // 电话
      password: '', // 密码
      sex: [
        { sex: '男', value: 1 },
        { sex: '女', value: 2 }
      ],
      edu: [
        { edu: '小学', value: 80 },
        { edu: '初中', value: 71 },
        { edu: '普通高中', value: 60 },
        { edu: '技工学校', value: 47 },
        { edu: '职业高中', value: 44 },
        { edu: '中等专科', value: 41 },
        { edu: '大学专科', value: 30 },
        { edu: '大学本科', value: 20 },
        { edu: '硕士研究生', value: 14 },
        { edu: '博士研究生', value: 11 }
      ],
      areaList,
      searchResult: [],
      shows: false, // 籍贯弹框
      showAddress: false, // 常住弹框
      show: false, // 性别弹框
      showEdu: false, // 文化程度弹框
      radioSex: '', // 当前选择的性别
      radioEdu: '',
      storageSex: {}, // 暂存的性别信息
      storageEdu: {}, // 暂存的文化程度
      code: ''
    }
  },
  created () {
    // this.getCode()
    // let token = localStorage.getItem('Zp-Token')
    // if (token === undefined || token === null || token === '') {
    //   this.$token.getToken()
    // }
  },

  components: { footerBar },
  methods: {

    // 性别弹框
    showPopup () {
      this.show = true
      this.gender.value = this.radioSex
    },
    // 性别弹框
    showPopupEdu () {
      this.showEdu = true
      this.education.value = this.radioEdu
    },
    /**
     * 籍贯弹框
     */
    showPopupAddress () {
      this.shows = true
    },
    showCommonly () {
      this.showAddress = true
    },
    // 性别选择
    sexClick (x) {
      this.radioSex = x.value
      this.storageSex = x
    },

    // 性别取消
    sexCancel () {
      if (this.gender.value !== '') {
        this.radioSex = this.gender.value
      }
      this.show = false
    },

    // 赋值 性别
    sexDetermine () {
      this.show = false
      this.gender = {sex: '', value: ''}
      this.gender = this.storageSex
    },

    // 学历选择
    eduClick (x) {
      this.radioEdu = x.value
      this.storageEdu = x
    },

    // 学历取消
    eduCancel () {
      if (this.education.value !== '') {
        this.radioEdu = this.education.value
      }
      this.showEdu = false
    },

    // 赋值 学历
    eduDetermine () {
      this.showEdu = false
      this.education = {edu: '', value: ''}
      this.education = this.storageEdu
    },
    // 户籍地址
    onChange (picker, index, value) {
      let val = picker.getValues()
      // console.log(val) // 查看打印
      let areaName = ''
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? '' : '/') + val[i].name
      }
      // this.carmodel = areaName
    },
    // 户籍确定选择城市
    onConfirm (val) {
      // console.log(val[1].code)
      this.aab301 = val[0].name + val[1].name
      this.shows = false // 关闭弹框
    },

    // 取消户籍弹框
    onCancel () {
      this.shows = false // 关闭弹框
    },
    /**
     * 常用地址
     */
    commonlyChange (picker, index, value) {
      let val = picker.getValues()
      // console.log(val) // 查看打印
      let areaName = ''
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? '' : '/') + val[i].name
      }
      // this.carmodel = areaName
    },
    // 户籍确定选择城市
    commonlyConfirm (val) {
      // console.log(val[1].code)
      this.yac100 = val[0].name + val[1].name
      this.showAddress = false // 关闭弹框
    },

    // 取消户籍弹框
    commonlyCancel () {
      this.showAddress = false // 关闭弹框
    },

    /**
     * 非静默授权，第一次有弹框
     */
    getCode () { // 非静默授权，第一次有弹框
      this.code = ''
      let local = window.location.href // 获取页面url
      local = local.split('//')
      console.log(local[1])
      this.code = this.getUrlCode().code // 截取code
      console.log(this.code)
      if (this.code == null || this.code === '') { // 如果没有code，则去请求
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc57a9c66a8a88bdf&redirect_uri=http://gxrswx.healthan.net/Access/home/getCode&response_type=code&scope=snsapi_base&state=' + local[1] + '&#wechat_redirect'
      } else {
        /**
         * 获取Token
         */
        this.getToken()
      }
    },
    /**
     * 截取url中的code方法
     */
    getUrlCode () {
      var url = location.search
      this.winUrl = url
      var theRequest = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      }
      return theRequest
    },

    getToken () {
      this.$http.post('/Access/home/getToken', {
        dateTime: new Date().getTime(),
        method: 'getToken',
        sign: '422121c4dfdfce667689dcd68aae0662',
        data: {
          code: this.code
        }
      }).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    },

    /**
      * 表单验证
      */
    test () {
      let p = new Promise((resolve, reject) => {
        const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
        const matchIDCard = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!matchIDCard.test(this.idcards)) {
          console.log(this.idcards)
          this.$dialog.alert({
            title: '提示',
            message: '身份证号码格式不正确'
          })
          resolve(false)
        } else if (this.name === '') {
          this.$dialog.alert({
            title: '提示',
            message: '姓名不能为空'
          })
          resolve(false)
        } else if (this.gender.value === '') {
          this.$dialog.alert({
            title: '提示',
            message: '请选择性别'
          })
          resolve(false)
        } else if (this.education.value === '') {
          this.$dialog.alert({
            title: '提示',
            message: '请选择文化程度'
          })
          resolve(false)
        } else if (this.aab301 === '') {
          this.$dialog.alert({
            title: '提示',
            message: '请选择户籍地址'
          })
          resolve(false)
        } else if (this.yac100 === '') {
          this.$dialog.alert({
            title: '提示',
            message: '请选择常用地址'
          })
          resolve(false)
        } else if (!reg.test(this.phonenumber)) {
          this.$dialog.alert({
            title: '提示',
            message: '手机号格式不正确'
          })
          resolve(false)
        } else if (this.password === '') {
          this.$dialog.alert({
            title: '提示',
            message: '请输入登录密码'
          })
          resolve(false)
        } else {
          resolve(true)
        }
      })
      return p
    },
    submitForm () {
      let _self = this
      this.test().then(function (data) {
        if (data === true) {
          _self.$token.setToken('Zp-Token', _self.$route.params.token)
          const regModel = {
            datetime: new Date().getTime(),
            method: 'register',
            sign: 0,
            data: {
              idcard: _self.idcards,
              name: _self.name,
              password: _self.password,
              gender: _self.gender.value,
              phonenumber: _self.phonenumber,
              education: _self.education.value,
              aab301: _self.aab301,
              yac100: _self.yac100
            }
          }
          _self.$http.postJson('/Api/RsRecru/Login/register', regModel, (res) => {
            if (res.data.code === 0 && res.data.error_code === 0) {
              _self.$token.setToken('Zp-Token', res.data.return_data.token)
              _self.$token.setToken('userName', res.data.return_data.aac003)
              _self.$token.setToken('idCard', res.data.return_data.aac002)
              _self.$router.push('/my')
            }
          })
        }
      })
    },
    toLogin () {
      this.$router.push('/Login')
    }
  }
}
</script>

<style>
.text-right{
    text-align: right;
}
.login .input-list{
    line-height: .35rem
}
.login .van-field__control{
     line-height: .35rem;
     text-align: right;
}
.sub-btn{
    padding: .45rem .1rem;
}
.sub-btn .button-large{
    border-radius: .08rem;
}
.down-list{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    background-color: #fff;
}
.down-list::before {
    position: absolute;
    left: 8px;
    color: #ee0a24;
    font-size: 14px;
    content: '*';
}
.down-list [class*=van-hairline]::after{
    border: none;
}
.edu{
    overflow-y:hidden
}
.edu .van-picker__toolbar{
    position: absolute;
    width: 100%;
    top: 0;
    background-color: #fff;
    z-index: 9;
}
.edu .edu-text{
    padding-top: 44px;
    height: 100%;
    overflow-y: scroll;
}
.mt20{
  margin-top: .2rem;
}

</style>
