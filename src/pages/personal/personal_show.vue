<template>
    <div>
        <!-- top 头部 -->
        <!-- <van-nav-bar class="bg" title="招聘会" @click-left="back"  left-text right-text left-arrow /> -->
        <div class="bg_job">
            <div class="head2">南宁市2020年就业淘</div>
            <div class="head3">房地产专项招聘会</div>
            <div class="bg-con">
                <div class="text">
                    <p>
                        <span class="color9">招聘会类型：</span>其他
                    </p>
                    <p>
                        <span class="color9">开始时间：</span>2020-02-11 08:00
                    </p>
                    <p>
                        <span class="color9">结束时间：</span>2020-02-11 12：30
                    </p>
                    <p>
                        <span class="color9">主办单位：</span>不详
                    </p>
                    <p>
                        <span class="color9">承办单位：</span>不详
                    </p>
                    <p>
                        <span class="color9">联系人：</span>邓小姐
                    </p>
                    <p>
                        <span class="color9">联系电话：</span>6230220
                    </p>
                    <p>
                        <span class="color9">联系地址：</span>南宁市星星路劳动保护局
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
            }
    }
  },
  created () {

  },
  methods: {

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
