<template>
  <div>
    <div class="my-top"></div>
    <div class="my-box">
        <div class="head-o">
            <p class="mb10 fw f18">{{userName}}</p>
            <p class="c-blue f15">账号：{{idCard}}</p>
        </div>
    </div>
    <div class=" my-list">
        <div class="bc-w">
            <van-cell-group>
                <van-cell title="我的简历" icon='orders-o' is-link @click="resume" />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="我的投递" icon='coupon-o' is-link @click="Delivery" />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="我的收藏" icon='star-o' is-link @click="Collection" />
            </van-cell-group>
            <!-- <van-cell-group>
                <van-cell title="退出" icon='info-o' is-link />
            </van-cell-group> -->
        </div>
    </div>

   <!-- 底部 footer -->
    <footerBar></footerBar>
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
      userName: '',
      idCard: ''
    }
  },
  created () {
    this.userName = localStorage.getItem('userName') || ''
    this.idCard = localStorage.getItem('idCard') || ''
    this.card()
  },
  components: { footerBar },
  methods: {
    card () {
      if (this.idCard !== '') {
        this.idCard = this.plusXing(this.idCard, 4, 4)
      }
    },
    plusXing (str, frontLen, endLen) {
      var len = str.length - frontLen - endLen
      var xing = ''
      for (var i = 0; i < len; i++) {
        xing += '*'
      }
      return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
    },
    /**
     * 收藏
     */
    Collection () {
      Toast('暂未开放')
    },
    /**
     * 简历
     */
    resume () {
      Toast('暂未开放')
    },
    Delivery () {
      Toast('暂未开放')
    }
  }

}
</script>

<style>
.my-top{
    height: 1rem;
    background-color: #8a91fb;
    position: relative;
}
.my-box{
    padding: .1rem;
    position: absolute;
    top: .4rem;
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
}
.my-box .head-o{
    min-height: 1.135rem;
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
.my-list{
    margin-top: .755rem;
    padding: .1rem;
}
.my-list .van-cell-group, .my-list .van-cell {
    background: none;

}
.my-list .van-cell{
    color: #333;
    font-size: .14rem;
}
.mb10{
    margin-bottom: .1rem;
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

</style>
