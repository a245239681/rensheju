import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/home/index'
import Position from '@/pages/position/position'
import PositionShow from '@/pages/position/position_show'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/position',
      name: 'Position',
      component: Position
    },
    {
      path: '/position_show',
      name: 'PositionShow',
      component: PositionShow
    }
  ]
})
