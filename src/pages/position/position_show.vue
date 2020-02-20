<template>
  <div>
        <!-- top 头部 -->
    <!-- <van-nav-bar class="bg"  @click-left="back"  left-text right-text left-arrow /> -->
      <div class="top-show">
        <van-row>
            <van-col span="20">
                <h3 class="name">{{datas.return_data.acb213}}</h3>
            </van-col>
            <van-col span="4">
                <span class='fc-w'>{{datas.return_time}}</span>
            </van-col>
            <van-col span="24">
                <span class="price">{{datas.return_data.acb248_dsc}}</span>
            </van-col>
            <van-col span="24">
                <div class="details">
                    <span class="" v-for="(items, inxs) in datas.return_data.intrTip" :key='inxs'> {{items}} |</span>
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
                <p>
                   {{datas.return_data.acb216}}
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
              {{datas.return_data.acb214}}
              <!-- <p style="text-align: center;">暂无</p> -->
                <!-- <span>周末双休</span><span>五险一金</span> -->
            </div>
      </div>
     <div class="mt10 min-height">
      <van-row class="p15">
        <van-col span="20">
          <p class="company-name-show">{{datas.return_data.company.aab004}}</p>
          <p class=" f13"><span v-for="(arr, inxs) in datas.return_data.company.tip" :key='inxs'> {{arr}} |</span></p>
          <p class="f13"><span class="">联系人：</span> {{datas.return_data.company.aae004}} <span class="ml10">联系电话：</span>{{datas.return_data.company.aae005}}</p>
          <!-- <p class="f13"></p> -->
        </van-col>
      </van-row>
    </div>
    <div style="padding:.35rem"></div>
      <div class="bottom-footer">
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
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
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
          acb213: '',
          acb217: '',
          acb248_dsc: '',
          acb303: '',
          acb216: '',
          intrTip: [],
          acb214: '',
          company: {
            aab004: '',
            tip: [],
            aae005: '',
            aae004: ''
          }
        },
        return_time: ''
      }}
  },
  created () {
    let d = this.$route.params
    this.aab001 = d.item.aab001
    this.acb210 = d.item.acb210
    this.getDetails()
    // this.$token.getToken()
  },
  methods: {
    /**
     * 获取详情数据
     */
    getDetails () {
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
          let end = this.datas.return_data.intrTip[this.datas.return_data.intrTip.length - 1]
          // console.log(end)
          this.datas.return_data.intrTip[this.datas.return_data.intrTip.length - 1] = '招' + end + '人'
        })
        .catch(error => {
          console.log(error)
        })
    },

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
    /**
     * 收藏
     */
    collect () {
      this.$http.post('/RsRecru/User/favoriteJob', {
        datetime: new Date().getTime(),
        method: 'favoriteJob',
        sign: '0',
        data: {
          acb210: this.acb210
        }
      }).then(res => {
        if (res.data.code === 0 && res.data.error_code === 0) {
          Toast.success('收藏成功')
        }
        if (res.data.code === 0 && res.data.error_code === 1) {
          Toast(res.data.error_msg)
        }
      }).catch(res => {

      })
    // Toast('功能暂未开放')
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
    border-radius: .08rem;
    font-size: .15rem;
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
  min-height: .35rem;
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
    font-size: .14rem;
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
   border-width: .01rem
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
.bg-w .van-divider{
  color: #333;
}
.top-show{
    background-color: #fff;
    padding: .2rem .1rem;
    margin-bottom: .1rem;
}
.top-show .name {
    font-size: .18rem;
    font-weight:bold;
    padding-bottom: .15rem;
}
.top-show .price {
    display: block;
    color: #767dff;
    font-size: .15rem;
    padding-bottom: .1rem;
    font-weight: bold;
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
 font-size: .14rem;
}
.line-height{
  line-height: .25rem;
}
.text{
  min-height: .64rem;
}
.img-l{
  height: .135rem;
  margin-left: .1rem;
  margin-top: .08rem;
}
.company-name-show{
  font-size: .15rem;
  font-weight: bold;
  /* padding-bottom: .12rem; */
}
.min-height{
  min-height: .35rem;
  background-color: #fff;
  line-height: .3rem
}
.p15{
  padding: .15rem .1rem;
}
.f13{
  font-size: .13rem
}
.ml10{
  margin-left: .1rem;
}
.mb10{
  margin-bottom: .1rem;
}
.fw{
  font-weight: bold
}
</style>

  function newFunction() {
    Toast('收藏成功')
  }
