<template>
  <div>
    <!-- top 头部 -->
    <!-- <van-nav-bar class="bg" title="就业淘" left-text right-text left-arrow /> -->
    <!-- 搜索 -->
    <!-- <div class="bg_seach"> -->
    <div class="bw">
      <div class="search-box">
        <span @click="showPopup" class="region-box">
          <div class="region-ellipsis">{{area}}</div>
        </span>
        <van-search @search="onSearch" background="none" placeholder="搜索公司" v-model="value" />
      </div>
    </div>
    <!-- </div> -->
    <!-- banner 幻灯片 -->
    <div>
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item>
          <img alt class="imgs" src="@/assets/images/banner.png" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 列表 推荐 -->
    <div class="mt10">
      <div class="title">
        <h3>职位推荐</h3>
        <span @click="go">
          <i class="mr10 color6">更多</i>
          <img alt class="more-img" src="@/assets/images/fanhui.png" />
        </span>
      </div>
      <van-pull-refresh @refresh="onRefresh" v-model="isLoading">
        <van-list :finished="finished" @load="onLoad" finished-text="没有更多了" v-model="loading">
          <van-cell :key="inx" @click="show(item)" class="mb10" v-for="(item, inx) in list">
            <van-row>
              <van-col span="24">
                <van-row>
                  <van-col span="15">
                    <div class="list-title f18">{{item.acb213}}</div>
                  </van-col>
                  <van-col span="9">
                    <div class="price">
                      <span>{{item.acb248_dsc}}</span>
                    </div>
                  </van-col>
                </van-row>
                <van-col span="24">
                  <p class="company-name">{{item.aab004}}</p>
                </van-col>
                <van-col span="24">
                  <div class="ask">
                    <span :key="inxs" v-for="(items, inxs) in item.tip">{{items}}</span>
                  </div>
                </van-col>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <div style="padding: .26rem"></div>
    </div>
    <div>
      <!-- 地区弹框 -->
      <van-popup :style="{ height: '50%' }" position="top" v-model="shows">
        <van-area
          :area-list="areaList"
          :columns-num="3"
          @cancel="onCancel"
          @change="onChange"
          @confirm="onConfirm"
          cancel-button-text="重置"
          ref="myArea"
          title="选择地区"
          value="450102"
        />
      </van-popup>
    </div>
    <!-- 底部 footer -->
    <footerBar></footerBar>
  </div>
</template>

<script>
import footerBar from '@/components/footer_bar'
import Vue from 'vue'
import axios from 'axios'
import areaList from '@/assets/js/area'
import { List, Cell, DropdownMenu, DropdownItem, Swipe, SwipeItem } from 'vant'

Vue.use(List).use(Cell).use(DropdownMenu).use(DropdownItem).use(Swipe).use(SwipeItem)
// 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
Vue.prototype.$http = axios

// 一些默认的参数
axios.defaults.baseURL = 'http://api.gxrswx.healthan.net'
export default {

  data () {
    return {
      value: '',
      shows: false, // 地区弹框
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      value1: 0,
      active: 0,
      option1: [],
      list: [], // 请求数据
      areaList,
      area: '全部', // 默认地区
      areaCode: '',
      carmodel: '',
      pageRow: 10,
      pageNo: 1,
      isLoading: false, // 是否处于下拉刷新状态
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      pageIndex: 0,
      pageSize: 10
    }
  },
  components: { footerBar },
  created () {
    this.init()
    // this.getroadList()
    this.$token.getToken()
  },
  methods: {

    init () { },

    // value=0改变省，1改变市，2改变区
    onChange (picker, index, value) {
      let val = picker.getValues()
      // console.log(val) // 查看打印
      let areaName = ''
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i === 0 ? '' : '/') + val[i].name
      }
      this.carmodel = areaName
    },
    // 确定选择城市
    onConfirm (val) {
      console.log(val[2].code)
      this.shows = false // 关闭弹框
      this.areaCode = val[2].code
      this.pageIndex = 0
      this.pageRow = 10
      this.pageNo = 1
      this.onLoad()
      this.area = val[2].name
    },

    // 获取列表数据
    getroadList () {
      const _self = this
      if (_self.pageIndex > 1) {
        _self.pageRow = _self.pageRow + 10
        _self.pageNo = _self.pageNo + 10
      }
      _self.$http.postJson('/Api/RsRecru/Job/JobList',
        {
          data: {
            aab004: '',
            aca112: '',
            acb215: this.areaCode,
            ycb213: '',
            hot: '',
            lately: '1',
            acc217: '',
            pageRow: this.pageRow,
            pageNo: this.pageNo
          },
          datetime: new Date().getTime(),
          method: 'JobList',
          sign: '0'
        },
        res => {
          if (res.data.code === 0) {
            const rows = res.data.return_data
            if (rows == null || rows.length === 0) {
              // 加载结束
              _self.finished = true
              // return
            } else {
              _self.finished = false
            }
            if (rows.length < _self.pageSize) {
              // 最后一页不足10条的情况
              _self.finished = true
            }
            // 处理数据
            if (_self.pageIndex === 1) {
              _self.list = rows
            } else {
              _self.list = _self.list.concat(rows)
              // console.log(_self.list)
            }
            _self.isLoading = false
            _self.loading = false
          }
        })
    },
    onSearch () {
      console.log(this.value)
      this.$router.push({
        name: 'Position',
        params: {
          val: this.value
        }
      })
    },
    onCancel () {
      this.shows = false // 关闭弹框
      // 重置地区
      this.areaCode = ''
      this.pageIndex = 0
      this.pageRow = 10
      this.pageNo = 1
      this.onLoad()
      this.area = '全部'
    },
    onLoad () { // 数据加载、上拉刷新
      this.pageIndex++
      this.getroadList()
    },

    onRefresh () { // 下拉刷新
      this.pageIndex = 1
      this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getroadList()
    },

    // 更多

    go () {
      this.$router.push('/position')
    },

    show (item) {
      this.$router.push({
        name: 'PositionShow',
        params: {
          item: item
        }
      })
    },
    showPopup () {
      this.shows = true
    }
  }

}
</script>

<style>
.bw {
  background-color: #fff;
  padding: 0.1rem;
}
.bw [class*='van-hairline']::after {
  border: none;
}
.bg_seach {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0.1rem;
  background-color: #fff;
}
.van-dropdown-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.van-field__body {
  padding-top: 0.02rem;
}
.van-search {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 3;
  -webkit-flex: 3;
  flex: 3;
  padding: 0;
}

/**搜索 */

.search-box {
  background-color: #f5f6fa;
  border-radius: 0.12rem;
  padding: 0.08rem 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: relative;
}

.region-box {
  display: block;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0 0.16rem;
  color: #333333;
  font-size: 0.14rem;
  line-height: 0.25rem;
  float: left;
}
.region-box::after {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -5px;
  border: 3px solid;
  border-color: transparent transparent currentColor currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: 0.8;
  content: '';
}
.search-box .van-search .van-cell {
  padding: 0px 8px 0px 15px;
  border-left: solid 1px #e5e5e5;
}

.my-swipe .van-swipe-item {
  color: #fff;
  background-color: #fff;

  /* font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed; */
}

.mt10 {
  margin-top: 0.1rem;
}
.f18 {
  font-size: 0.18rem;
}
.color6 {
  color: #666666;
}
.mr10 {
  margin-right: 0.1rem;
}

.title {
  height: 0.25rem;
  border-bottom: 0.01rem solid #f0efef;
  line-height: 0.25rem;
  background-color: #fff;
  padding: 0.1rem;
}
.title > h3 {
  float: left;
}
.title > span {
  float: right;
}
.van-list {
  margin-bottom: 0.1rem;
}
.list-title {
  color: #333333;
  padding-bottom: 0.18rem;
}
.company-name {
  font-size: 0.14rem;
  padding-bottom: 0.12rem;
}
.ask > span {
  background-color: #f4f6f9;
  color: #abb0c2;
  padding: 0.06rem;
  font-size: 0.11rem;
  margin-left: 0.1rem;
}
.ask > span:first-child {
  margin-left: 0;
}
.price > span {
  color: #767dff;
  font-size: 0.15rem;
}
.mb10 {
  margin-bottom: 0.1rem;
}
.imgs {
  height: 1.25rem;
  margin: auto;
  display: block;
}
.more-img {
  height: 0.1rem;
}
</style>
