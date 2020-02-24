<template>
  <div>
    <div class="my-top">
        <img class="img" src="@/assets/images/login_banner.png" alt="">
    </div>
    <div class="my-boxs">
        <div class="head-o">
            <h3 class="login-title">登录</h3>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="info.idcard"
                    name="idcard"
                    class="idcard"
                    left-icon='manager-o'
                    placeholder="请输入身份证号"
                    clearable
                    :rules="[{ required: true, message: '请输入身份证号' }]"
                />
                <van-field
                    v-model="info.password"
                    type="password"
                    left-icon='bag-o'
                    name="password"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请输入登录密码' }]"
                />
                <div class="mt45">
                    <van-button round block type="info" size="large" class="btn" color="#767dff" native-type="submit">
                    登录
                    </van-button>
                    <p class="mt20">没有账号？<a href="javascript:;" @click="toReg">立即注册</a></p>
                </div>
            </van-form>
    </div>
    </div>
    <div class=" my-lists"> </div>

  </div>

</template>

<script>
import footerBar from '@/components/footer_bar'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {

  data () {
    return {
      info: {
        idcard: '',
        password: ''

      }
    }
  },
  created () {
    console.log(this.$route.params.token)
  },
  components: { footerBar },
  methods: {
    onSubmit (values) {
      let accessCode = localStorage.getItem('accessCode')
      values.accessCode = accessCode
      this.$http.postJson('/Api/RsRecru/Login/login', {
        datetime: new Date().getTime(),
        method: 'login',
        sign: 'asd',
        data: values
      },
      res => {
        if (res.data.code === 0 && res.data.error_code === 0) {
          this.$token.setToken('Zp-Token', res.data.return_data.token)
          this.$token.setToken('userName', res.data.return_data.aac003)
          this.$token.setToken('idCard', res.data.return_data.aac002)
          this.$router.push('/my')
        }
        if (res.data.code === 0 && res.data.error_code === 1) {
          Toast.error_code(res.data.error_msg)
        }
      })
    },
    toReg () {
      this.$router.push('/Register')
    }
  }

}
</script>

<style>
my-tops{
    min-height: 1rem;
    background-color: #8a91fb;
    position: relative;
}
.my-boxs{
    padding: .1rem;
    position: absolute;
    top: 1.3rem;
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
}
.my-boxs .head-o{
    min-height: 3.46rem;
    background-color: #fff;
    border-radius: .08rem;
    padding: .23rem .2rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
}
.mt10{
    margin-top: .1rem;
}
.bc-w{
    background-color: #fff;
    border-radius: .08rem;
}
.my-lists{
    margin-top: .755rem;
    padding: .1rem;
}
.my-lists .van-cell-group, .my-lists .van-cell {
    background: none;

}
.my-lists .van-cell{
    color: #333;
    font-size: .14rem;
}
.mb10{
    margin-bottom: .1rem;
}
.mt20{
    margin-top: .2rem;
}
.fw{
    font-weight: bold
}
.f18{
    font-size: .18rem
}
.f15{
    font-size: .15rem;
}
.c-blue{
    color: #666666
}
.img{
    height: 2.09rem;
}
.login-title{
    padding-bottom: .25rem;
    color: #333;
    font-weight: bold;
    font-size: .19rem;
}
.btn{
    border-radius: .08rem;
    font-size: .15rem;
}
.mt45{
    margin-top: .45rem;
}
</style>
