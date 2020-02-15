<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/position">职位</van-tabbar-item>
      <van-tabbar-item icon="setting-o">招聘会</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
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
  }

}
</script>

<style scoped>

</style>
