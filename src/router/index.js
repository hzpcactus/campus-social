import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
import blog from '@/components/blog'
import about from '@/components/about'
import notice from '@/components/notice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: index
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录页面'
      },
      component: login
    },
    {
      path: '/blog',
      name: 'blog',
      meta: {
        title: '动态'
      },
      component: blog
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于'
      },
      component: about
    },
    {
      path: '/notice',
      name: 'notice',
      meta: {
        title: '通知'
      },
      component: notice
    },
    
    
  ]
})
