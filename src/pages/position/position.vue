<template>
  <div>
         <!-- top 头部 -->
    <van-nav-bar class="bg" title="就业淘" left-text right-text left-arrow />
    <!-- 搜索 -->
    <div class="seach">
      <van-search class="bg_van"
        v-model="value"
        background='none'
        placeholder="搜索职位"
        @search="onSearch"
        />
        <div>
            <van-row class="line-h">
                <van-col span="6">
                   <span class="region-boxs" @click="showPopup">
                     <div class="region-ellipsis">{{area}}</div>
                   </span>
                </van-col>
                <van-col span="6">最新</van-col>
                <van-col span="6">最热</van-col>
                <van-col span="6">
                  <span class="region-boxs" @click="showMore">
                    <div class="region-ellipsis">更多</div>
                  </span>
                </van-col>
            </van-row>
        </div>
    </div>
    <!-- 列表 -->
    <div class="p10">
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="mb10 rd" v-for="(item, inx) in list" :key='inx'  @click="show(item)">
              <van-row >
                  <van-col span="24">
                    <van-row >
                        <van-col span="15"><div class="list-title f18">{{item.aca112}}</div></van-col>
                        <van-col span="9">
                          <div class="price">
                            <span>{{item.acb248_dsc}}</span>
                          </div>
                        </van-col>
                      </van-row>
                      <van-col span="24"> <p class="company-name">{{item.aab004}}</p></van-col>
                        <van-col span="24">
                          <div class="ask">
                            <span v-for="(items, inxs) in item.tip" :key='inxs'>{{items}}</span>
                          </div>
                        </van-col>
                  </van-col>
                </van-row>
            </van-cell>
          </van-list>
       </van-pull-refresh>
        <div style="padding: .20rem"></div>
    </div>
    <div>
      <!-- 地区弹框 -->
      <van-popup
        v-model="shows"
        position="top"
        :style="{ height: '50%' }"
      >
        <van-area :area-list="areaList" :columns-num="3" ref="myArea" title="选择地区" @change="onChange" @confirm="onConfirm" @cancel="onCancel"/>
      </van-popup>
    </div>
    <div>
       <van-popup
        v-model="showModal"
        position="top"
        :style="{ height: '100%' }"
      >
      <div>
        <h2 class="title-h2">学历要求</h2>
       <div class="edu">
          <a v-for="(types,index) in education" :key='index'  :class="(selected.edu===types)?'active':''" @click="eduChange(types)" >{{types}} </a>
       </div>
       <div>  <h2 class="title-h2">薪酬范围</h2></div>
       <div class="edu">
          <a v-for="(salarys,index) in salary" :key='index'  :class="(selected.sal===salarys)?'active':''" @click="salaryChange(salarys)" >{{salarys}} </a>
       </div>
        <div>  <h2 class="title-h2">工作年限</h2></div>
       <div class="edu">
          <a v-for="(y,index) in years" :key='index'  :class="(selected.yyy===y)?'active':''" @click="yearsChange(y)" >{{y}} </a>
       </div>
       <div></div>
      </div>
      </van-popup>
    </div>
     <!-- 底部 footer -->
    <footerBar></footerBar>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import areaList from '@/assets/js/area'
import footerBar from '@/components/footer_bar'
// 给Vue实例添加一个是个属性，这样在每个实例中就可以使用this.$http来访问axios实例了
Vue.prototype.$http = axios

// 一些默认的参数
axios.defaults.baseURL = 'http://api.gxrswx.healthan.net/Api'
export default {

  data () {
    return {
      value: '',
      shows: false, // 地区弹框
      showModal: false, // 更多筛选
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
      pageSize: 10,
      education: ['不限', '研究生及以上', '博士研究生', '硕士研究生', '本科', '技工学校', '高中', '初中', '小学', '其他'], // 学历高俅
      salary: ['不限', '面议', '1300-2000', '2001-3000', '3001-4000',
        '4001-6000', '6001-8000', '8001-10000', '10001-15000', '15001-20000', '20001以上'], // 薪酬范围
      years: ['不限', '0-1年', '1-3年', '3-5年', '5-10年', '10年以上'], // 工作年限
      selected: {
        edu: '不限',
        sal: '不限',
        yyy: '不限'
      }

    }
  },
  created () {
    // console.log(this.$route.params)
    this.value = this.$route.params.val
    // this.getroadList(this.value)
  },
  components: {footerBar},
  methods: {
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
      this.area = val[1].name
    },

    // 获取数据
    getroadList () {
      const _self = this
      if (_self.pageIndex > 1) {
        _self.pageRow = _self.pageRow + 10
        _self.pageNo = _self.pageNo + 10
      }
      _self.$http.post('/RsRecru/Job/JobList',
        {
          data: {
            aab004: '',
            aca112: this.value || '',
            acb215: this.areaCode || '',
            ycb213: '',
            hot: '',
            lately: '',
            acc217: '',
            pageRow: this.pageRow,
            pageNo: this.pageNo
          },
          datetime: new Date().getTime(),
          method: 'JobList',
          sign: '0'
        }
      )
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
            } else {
              _self.list = _self.list.concat(rows)
              console.log(_self.list)
            }
          }
        })
        .catch(error => {
          console.log(error)
        }).finally(() => {
          _self.isLoading = false
          _self.loading = false
        })
    },

    // 取消弹框
    onCancel () {
      this.shows = false // 关闭弹框
    },
    // 搜索
    onSearch () {
      console.log(this.value)
      this.pageIndex = 0
      this.pageRow = 10
      this.pageNo = 1
      this.onLoad()
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
    },
    showMore () {
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    eduChange (input) {
      if (!input) return false
      if (input !== this.selected.edu) {
        this.selected.edu = input
      }
    },
    salaryChange (input) {
      if (!input) return false
      if (input !== this.selected.sal) {
        this.selected.sal = input
      }
    },
    yearsChange (input) {
      if (!input) return false
      if (input !== this.selected.yyy) {
        this.selected.yyy = input
      }
    }
  }

}
</script>

<style>
.p10{
    padding: .1rem;
}
.seach{
    background-color: #8a91fb;
    /* padding-bottom: .2rem; */
    padding-top: .15rem;
    padding-left: .1rem;
    padding-right: .1rem;
}
.rd{
    border-radius: .08rem;
}
.seach .van-search__content{
    border-radius: .2rem;
    background-color: #9ca2f8;
    color: #f3f4f8
}
.seach .van-field__left-icon{
    color: #f3f4f8;
}
.seach .van-field__control[type=search] {
    color: #fff;
}
.seach input::-webkit-input-placeholder {
    /* 修改字体颜色 */
    color: #fff;
}
.seach .van-dropdown-menu{
    background-color: #8a91fb;
}
.seach [class*=van-hairline]::after{
    border: none;
}
.seach .van-dropdown-menu__title{
    color: #f3f4f8
}
.line-h{
    line-height: .5rem;
    text-align:center;
    color: #fff;
    font-size: .15rem
}
/* 列表 */
.box{
    border-radius: .09rem
}
.van-list{
  margin-bottom: .1rem;
  /* margin-top: -.6rem; */
}
.list-title{
  color: #333333;
  padding-bottom: .18rem;
}
.company-name{
  font-size: .14rem;
  padding-bottom: .12rem;
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
.price > span{
  color: #767dff;
  font-size: .15rem
}
.mb10{
  margin-bottom: .1rem;
}
.mt10{
  margin-top: .1rem;
}
.f18{
  font-size: .18rem;
}
/*地区选择*/
.region-boxs{
    display: block;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0 .16rem;
    color: #fff;
    font-size: .14rem;
    line-height: .25rem;
    float: left;
    margin-top: .12rem;
}
.region-boxs::after{
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: .8;
    content: '';
}

/**更多 */

.title-h2{
  padding: .16rem;
  color: #333;
  font-size: .18rem;
  font-weight: normal
}
.edu{
  display: block;
  background-color: #fff;
}
.edu::after {
    display: table;
    clear: both;
    content: '';
}
.edu > a{
    background-color: #f4f6f9;
    color: #999999;
    font-size: .14rem;
    text-align: center;
    width: 33.33333333%;
    display: block;
    float: left;
    padding: .1rem;
    line-height: .38rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-clip: content-box;
    border-radius: .16rem;
}
.edu >a.active{
  background-color: #767dff;
    color: #fff;
}

</style>
