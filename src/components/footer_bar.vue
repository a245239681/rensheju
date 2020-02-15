<template>
  <div>
  <van-tabbar v-model="active" inactive-color="#777777" active-color="#000000">
    <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="(item.name)">
      <span>{{item.title}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
    </van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'footer_bar',
  data () {
    return {
      active: 0,
      tabbars: [
        {
          name: '/',
          title: '首页',
          normal:
            '../src/assets/images/sy_h.png',
          active:
            '../src/assets/images/sy_d.png'
        },
        {
          name: 'Position',
          title: '职位',
          normal:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-xx.png',
          active:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-xx2.png'
        },
        {
          name: 'personal',
          title: '招聘会',
          normal:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd.png',
          active:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd2.png'
        },
        {
          name: 'personal',
          title: '我的',
          normal:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd.png',
          active:
            'http://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd2.png'
        }
      ]
    }
  }

}
</script>

<style scoped>

</style>
