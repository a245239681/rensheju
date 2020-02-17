<template>
  <div>
    <!-- top 头部 -->
    <!-- <van-nav-bar class="bg" title="招聘会" left-text right-text left-arrow /> -->
    <!-- 搜索 -->
    <!-- <div class="bg_seach"> -->
    <div class="bw">
      <div class="search-box">
        <span class="region-box" @click="showPopup">
          <div class="region-ellipsis">{{area}}</div>
        </span>
        <van-search v-model="value" background="none" placeholder="搜索招聘会" @search="onSearch" />
      </div>
    </div>
    <!-- </div> -->
    <!-- banner 幻灯片 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img class="imgs" src="@/assets/images/jobfair_banner1.png" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 列表 推荐 -->
    <div class="mt10">
      <!-- <div class="title">
                <h3>职位推荐</h3>
                <span @click="go"><i class="mr10 color6">更多</i><img src="@/assets/images/fanhui.png" alt=""></span>
      </div>-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell class="mb10" v-for="(item, inx) in list" :key="inx" @click="show(item.acb330)">
            <van-row>
              <van-col span="24">
                <van-col span="24">
                  <div class="list-title f16">{{item.acb331}}</div>
                </van-col>
                <van-col span="24">
                  <span>
                    <van-icon class="mr10 mt5 fc-w color-ico" name="clock-o" />
                    <span class="fc-w color9">开始时间：{{item.acb333}}</span>
                  </span>
                </van-col>
                <van-col span="24">
                  <span>
                    <van-icon class="mr10 mt5 fc-w color-ico" name="clock-o" />
                    <span class="fc-w color9">结束时间：{{item.acb334}}</span>
                  </span>
                </van-col>
                <van-col span="24">
                  <span>
                    <van-icon class="mr10 mt5 fc-w color-ico" name="location-o" />
                    <span class="fc-w color9">地点：{{item.acb303}}</span>
                  </span>
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
      <van-popup v-model="shows" position="top" :style="{ height: '50%' }">
        <van-area
          :area-list="areaList"
          :columns-num="2"
          ref="myArea"
          value="450100"
          title="选择地区"
          @change="onChange"
          @confirm="onConfirm"
          @cancel="onCancel"
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

Vue.use(List)
  .use(Cell)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Swipe)
  .use(SwipeItem)
// 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
Vue.prototype.$http = axios

// 一些默认的参数
axios.defaults.baseURL = 'http://api.gxrswx.healthan.net/Api'
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
  },
  methods: {
    init () {},

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
      console.log(val[1].code)
      this.shows = false // 关闭弹框
      this.areaCode = val[1].code
      this.pageIndex = 0
      this.pageRow = 10
      this.pageNo = 1
      this.onLoad()
      this.area = val[1].name
    },

    // 获取列表数据
    getroadList () {
      const _self = this
      if (_self.pageIndex > 1) {
        _self.pageRow = _self.pageRow + 10
        _self.pageNo = _self.pageNo + 10
      }
      _self.$http
        .post('/RsRecru/JobFair/JobFairList', {
          data: {
            aab301: _self.areaCode || '',
            pageRow: _self.pageRow,
            pageNo: _self.pageNo
          },
          datetime: new Date().getTime(),
          method: 'JobFairList',
          sign: '0'
        })
        .then(res => {
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
              console.log(_self.list)
            } else {
              _self.list = _self.list.concat(rows)
              // console.log(_self.list)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          _self.isLoading = false
          _self.loading = false
        })
    },
    onSearch () {
      this.pageIndex = 0
      this.pageRow = 10
      this.pageNo = 1
      this.onLoad()
    },
    onCancel () {
      this.shows = false // 关闭弹框
    },
    onLoad () {
      // 数据加载、上拉刷新
      this.pageIndex++
      this.getroadList()
    },

    onRefresh () {
      // 下拉刷新
      this.pageIndex = 1
      this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getroadList()
    },

    show (id) {
      this.$router.push({
        name: 'PersonalShow',
        params: {
          Id: id
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
[class*="van-hairline"]::after {
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
  content: "";
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
.f16 {
  font-size: 0.16rem;
}
.color6 {
  color: #666666;
}
.color9 {
  color: #999;
}
.color-ico {
  color: #7780fe;
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
</style>
