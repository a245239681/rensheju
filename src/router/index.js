import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/home/index'
import Position from '@/pages/position/position'
import PositionShow from '@/pages/position/position_show'
import Personal from '@/pages/personal/personal'
import PersonalShow from '@/pages/personal/personal_show'
import Register from '@/pages/reg/reg'
import My from '@/pages/my/my'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '就业淘'
      }
    },
    {
      path: '/position',
      name: 'Position',
      component: Position,
      meta: {
        title: '职位列表'
      }
    },
    {
      path: '/position_show',
      name: 'PositionShow',
      component: PositionShow,
      meta: {
        title: '职位详情'
      }
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: '招聘会'
      }
    },
    {
      path: '/Personal_show',
      name: 'PersonalShow',
      component: PersonalShow,
      meta: {
        title: '招聘会详情'
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/My',
      name: 'My',
      component: My,
      meta: {
        title: '我的'
      }
    }
  ]
})
