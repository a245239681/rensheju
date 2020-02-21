<template>
    <div>
        <!-- top 头部 -->
        <!-- <van-nav-bar class="bg" title="招聘会" @click-left="back"  left-text right-text left-arrow /> -->
        <div class="bg_job">
            <!-- 主题 -->
            <div class="head2">南宁市2020年就业淘</div>
            <div class="head3">{{datas.return_data.ycb331}}</div>
            <div class="bg-con">
                <div class="text">
                    <p>
                        <span class="color9">招聘会类型：</span>{{datas.return_data.ycb336}}
                    </p>
                    <p>
                        <span class="color9">开始时间：</span>{{datas.return_data.acb333}}
                    </p>
                    <p>
                        <span class="color9">结束时间：</span>{{datas.return_data.acb334}}
                    </p>
                    <p>
                        <span class="color9">主办单位：</span>{{datas.return_data.ycb338}}
                    </p>
                    <p>
                        <span class="color9">承办单位：</span>{{datas.return_data.ycb339}}
                    </p>
                    <p>
                        <span class="color9">联系人：</span>{{datas.return_data.aae004}}
                    </p>
                    <p>
                        <span class="color9">联系电话：</span>{{datas.return_data.aae005}}
                    </p>
                    <p>
                        <span class="color9">联系地址：</span>{{datas.return_data.acb303}}
                    </p>
                </div>

            </div>

            <img class="bg_img" src="@/assets/images/jobfair_bg.jpg" alt="">
        </div>

</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
// 一些默认的参数
// axios.defaults.baseURL = 'http://api.gxrswx.healthan.net/Api'
export default {
  name: 'personal_show',
  data () {
    return {
      aab001: '',
      acb210: '',
      datas:
            {
              code: 0,
              error_code: 0,
              return_data: {
                ycb331: '',
                acb333: '',
                acb334: '',
                acb303: '',
                ycb336: '',
                aae004: '',
                ycb338: '',
                ycb339: '',
                aae005: ''
              },
              return_time: ''
            },
      acb330: '' // 招聘会编号
    }
  },
  created () {
    let d = this.$route.params
    // console.log(d)
    this.acb330 = d.Id
    this.getDetails()
  },
  methods: {

    getDetails () {
      const _self = this
      _self.$http.postJson('/Api/RsRecru/JobFair/JobFairDetails', {
        data: {
          acb330: this.acb330
        },
        datetime: new Date().getTime(),
        method: 'JobFairDetails',
        sign: '0'

      }, res => {
        let d = this.formatDate(res.data.return_time)
        res.data.return_time = d
        this.datas = res.data
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
    }

  }

}
</script>

<style>
.text p{
    font-size: .14rem;
    line-height: .3rem;
    margin: 0.05rem 0;
    color: #333;
}
.line-wei{
    -webkit-box-flex: 12;
    -webkit-flex: 12;
    flex: 12;
    font-size: .16rem;
    font-weight: bold;
}
.bg-w{
    background-color: #fff;
    padding: .1rem;
    margin-bottom: .1rem;
}

.mr10{
    margin-right: .05rem;
}
.f16{
    font-size: .16rem;
}
.fc-w{
    color: #959595;
}
.mt5{
    vertical-align: -.02rem;
}
.bg_job{
    width: 100%;
    position: relative;
}
.bg_job .bg_img{
    width: 100%;
    position: absolute;
}
.bg-con{
    position: absolute;
    z-index: 100;
    background: #fff;
    width: 94%;
    left: 3%;
    top: 1.2rem;
    border-radius: 0.1rem;
    padding: 18px 25px;
    box-sizing: border-box;
    background: linear-gradient(#fff, #f3f3f3);
}
.color9{color: #999}
.head2{
    font-size: 0.2rem;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0.35rem;
    z-index: 95;
    color: #fff;
    font-weight: bold;
}
.head3{
    font-size: 0.15rem;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0.75rem;
    z-index: 95;
    color: #fff;
    font-weight: bold;
}
</style>
