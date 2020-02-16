<template>
  <div>
        <!-- top 头部 -->
    <van-nav-bar class="bg"  @click-left="back"  left-text right-text left-arrow />
      <div class="top-show">
        <van-row>
            <van-col span="20">
                <h3 class="name">{{datas.return_data.aca112}}</h3>
            </van-col>
            <van-col span="4">
                <span>{{datas.return_time}}</span>
            </van-col>
            <van-col span="24">
                <span class="price">{{datas.return_data.acb248_dsc}}</span>
            </van-col>
            <van-col span="24">
                <div class="details">
                    <span class="w_color" v-for="(items, inxs) in datas.return_data.intrTip" :key='inxs'> {{items}}</span>
                    <span class="w_color">{{datas.return_data.Tip[0]}}</span>
                </div>
            </van-col>
            <van-col span="24" class="line-height">
                <span ><van-icon  class="mr10 mt5 fc-w" name="location-o" /><span class="f14 fc-w">{{datas.return_data.acb303}}</span> </span>
            </van-col>
        </van-row>
      </div>
      <div class="bg-w">
           <van-row>
                <van-col span="24" class="h">
                    <div class="f"><img class="img-l" src="@/assets/images/ww.png" alt=""></div>
                     <van-divider class="line-wei" content-position="left">职位描述</van-divider>
                </van-col>
            </van-row>
            <div class="text">
                <p style="text-align: center;">
                    暂无
                </p>
            </div>

      </div>
        <div class="bg-w">
           <van-row>
                <van-col span="24" class="h">
                    <div class="f"><img class="img-l" src="@/assets/images/ww.png" alt=""></div>
                     <van-divider class="line-wei" content-position="left">福利待遇</van-divider>
                </van-col>
            </van-row>
            <div class="ask">
              <p style="text-align: center;">暂无</p>
                <!-- <span>周末双休</span><span>五险一金</span> -->
            </div>
      </div>
      <!-- <div class="bottom-footer">
          <div class="fexi">
            <van-row>
                <van-col span="12">
                    <div class="lieb" @click="collect">
                        <van-icon name="star-o" />
                        <span>收藏</span>
                    </div>
                </van-col>
                <van-col span="12">
                <van-button class="btn" type="info" size="large" color="#767dff" @click="sendOut">发送简历</van-button>
                </van-col>
            </van-row>
          </div>
      </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
Vue.use(Toast)
Vue.prototype.$http = axios
// 一些默认的参数
axios.defaults.baseURL = 'http://api.gxrswx.healthan.net/Api'
export default {
  name: 'position_show',
  data () {
    return {
      aab001: '',
      acb210: '',
      datas:
      {
        return_data: {
          acb210: '',
          aab001: '',
          aca112: '',
          acb217: '',
          acb303: '',
          acb248_dsc: '',
          Tip: [],
          intrTip: [],
          company: {
            aab004: '',
            tip: []
          }
        },
        return_time: ''
      }}
  },
  created () {
    let d = this.$route.params
    this.aab001 = d.item.aab001
    this.acb210 = d.item.acb210
    this.$http.post('/RsRecru/Job/JobDetails',
      {
        data: {
          aab001: this.aab001,
          acb210: this.acb210
        },
        datetime: new Date().getTime(),
        method: 'JobDetails',
        sign: '0'
      }
    )
      .then(res => {
        let d = this.formatDate(res.data.return_time)
        res.data.return_time = d
        this.datas = res.data
        if (this.datas.return_data.intrTip.length >= 3) {
          this.datas.return_data.intrTip[2] = '招' + this.datas.return_data.intrTip[2] + '人'
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    formatDate (value) { // 时间戳转换日期格式方法
      if (value == null) {
        return ''
      } else {
        let date = new Date(value)
        // let y = date.getFullYear()// 年
        let MM = date.getMonth() + 1// 月
        MM = MM < 10 ? ('0' + MM) : MM
        let d = date.getDate()// 日
        d = d < 10 ? ('0' + d) : d
        return MM + '-' + d
      }
    },
    back () {
      console.log(123)
      this.$router.go(-1) // 返回上一层
    },
    collect () {
      Toast('功能暂未开放')
    },
    sendOut () {
      Toast('功能功能待开发')
    }
  }

}
</script>

<style>
.lieb{
    text-align: center;
    height: .5rem;
    line-height: .48rem;
    font-size: .15rem
}
.btn{
    border-radius: .08rem
}
.fexi{
  background-color: #fff;
  padding: .1rem;
}
.bottom-footer{
    position:fixed;
    bottom: 0;
    width: 100%;

}
.bg-w .ask{
  min-height: 1.35rem;
}
.ask > span{
  background-color: #f4f6f9;
  color: #abb0c2;
  padding: .06rem;
  font-size: .11rem;
  margin-left: .1rem;
}
.ask > span:first-child{
  margin-left: 0;
}
.text p{

    font-size: .14rem;
    line-height: .3rem

}
.line-wei{
  -webkit-box-flex: 18;
    -ms-flex: 12;
    flex: 18;
    font-size: .16rem;
    font-weight: bold;
}
.h{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.h .van-divider--content-left::before{
    max-width: 0;
}
.h .van-divider::after{
   border-width: .02rem
}
.f{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: .5;
    -ms-flex: 1;
    flex: .5;
    font-size: .24rem;
    font-weight: bold;
    position: relative;
    top: .12rem;
    left: -.10rem;
    color: #767dff;
}
.bg-w{
    background-color: #fff;
    padding: .1rem;
    margin-bottom: .1rem;
}
.bg-w .van-divider--content-left::before{
 margin-right: 0px;
}
.top-show{
    background-color: #fff;
    padding: .2rem .1rem;
    margin-bottom: .1rem;
}
.top-show .name {
    font-size: .18rem;
    font-weight:bold;
    padding-bottom: .1rem;
}
.top-show .price {
    display: block;
    color: #767dff;
    font-size: .15rem;
    padding-bottom: .1rem;
}
.top-show .details {
    font-size: .14rem;
    padding-bottom: .1rem;
}
.top-show .details .w_color{
    color: #c8c9cc
}
.mr10{
    margin-right: .05rem;
}
.f16{
    font-size: .16rem;
}
.f14{
  font-size: .14rem;
}
.fc-w{
    color: #959595;
}
.mt5{
    vertical-align: -.02rem;
}
.line-height{
  line-height: .25rem;
}
.text{
  min-height: 1.64rem;
}
.img-l{
  height: .135rem;
  margin-left: .1rem;
  margin-top: .06rem;
}
</style>
