<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="column" to="/position">职位</van-tabbar-item>
      <van-tabbar-item icon="cluster" to="/Personal">招聘会</van-tabbar-item>
      <van-tabbar-item icon="manager" to='/Register'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  name: 'footer_bar',
  data () {
    return {
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
    }
  },
  created () {
    if (this.$route.name === 'Index') {
      this.active = 0
    } else if (this.$route.name === 'Position') {
      this.active = 1
    } else if (this.$route.name === 'Personal') {
      this.active = 2
    } else if (this.$route.name === 'Register') {
      this.active = 3
    }
  },
  methods: {

    too () {
      Toast('暂未开放')
    }

  }

}
</script>

<style scoped>

</style>
