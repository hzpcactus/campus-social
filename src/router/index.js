import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
import blog from '@/components/blog/blog'
import blogTheme from '@/components/blog/components/blogTheme'
import about from '@/components/about'
import notice from '@/components/notice/index'
import getNotice from '@/components/notice/components/notice'
import getLike from '@/components/notice/components/getLike'
import getRemark from '@/components/notice/components/remark'
import friendsAccept from '@/components/notice/components/friendsAccept'
import manager from '@/components/managerPermissions/index'
import sendNotice from '@/components/managerPermissions/sendNotice'
import grantPermissions from '@/components/managerPermissions/grantPermissions' 
import dataAnalysis from '@/components/managerPermissions/dataAnalysis'
import schoolData from '@/components/managerPermissions/schoolData'
import onlinePersonData from '@/components/managerPermissions/onlinePersonData'
import chat from '@/components/chat/chat'
import friendChat from  '@/components/chat/friendChat'
import collection from  '@/components/chat/collection'  
import fileChat from  '@/components/chat/fileChat'  
import groupChat from  '@/components/chat/groupChat'  
import school from '@/components/school/index'
import examInfo from '@/components/school/components/examInfo'
import examScore from '@/components/school/components/examScore'
import schedule from '@/components/school/components/schedule'



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
      component: blog,
      children:[]
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
      component: notice,
      children:[{
        path:'/getNotice',
        name:'getNotice',
        meta:{
          title:'收到通知'
        },
        component:getNotice
       },
       {
        path:'/getLike',
        name:'getLike',
        meta:{
          title:'收到的赞'
        },
        component:getLike
       },
       {
        path:'/getRemark',
        name:'getRemark',
        meta:{
          title:'收到评论'
        },
        component:getRemark
       },
       {
        path:'/friendsAccept',
        name:'friendsAccept',
        meta:{
          title:'好友验证通知'
        },
        component:friendsAccept
       },
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      meta: {
        title: '管理员权限'
      },
      component: manager,
      children:[{
        path: '/sendNotice',
        name: 'sendNotice',
        meta: {
          title: '发送通知'
        },
        component: sendNotice
      },
      {
        path: '/grantPermissions',
        name: 'grantPermissions',
        meta: {
          title: '授予权限'
        },
        component: grantPermissions
      },
      {
        path: '/dataAnalysis',
        name: 'dataAnalysis',
        meta: {
          title: '用户分布图'
        },
        component: dataAnalysis
      },
      {
        path: '/schoolData',
        name: 'schoolData',
        meta: {
          title: '学校数据柱状图'
        },
        component: schoolData
      },
      {
        path: '/onlinePersonData',
        name: 'onlinePersonData',
        meta: {
          title: '在线人数折线图'
        },
        component: onlinePersonData
      },
     ]
    },
    {
      path:'/blogTheme',
      name:'blogTheme',
      meta:{
        title:'动态背景'
      },
      component: blogTheme      
    },
    {
      path:'/chat',
      name:'chat',
      meta:{
        title:'聊天'
      },
      component: chat, 
      children:[
        {
          path:'/friendChat',
          name:'friendChat',
          meta:{
            title:'好友聊天'
          },
          component: friendChat     
        },  
        {
          path:'/collection',
          name:'collection',
          meta:{
            title:'收藏'
          },
          component: collection     
        },  
        {
          path:'/fileChat',
          name:'fileChat',
          meta:{
            title:'文件'
          },
          component: fileChat     
        },
        {
          path:'/groupChat',
          name:'groupChat',
          meta:{
            title:'群聊'
          },
          component: groupChat     
        },
      ]      
    },
    {
      path:'/school',
      name:'school',
      meta:{
        title:'校内服务'
      },
      component: school,
      children:[ 
        {
          path:'/examInfo',
          name:'examInfo',
          meta:{
            title:'考试信息'
          },
          component: examInfo     
        }, 
        {
          path:'/examScore',
          name:'examScore',
          meta:{
            title:'考试成绩'
          },
          component: examScore     
        }, 
        {
          path:'/schedule',
          name:'schedule',
          meta:{
            title:'课程表'
          },
          component: schedule     
        },
      ]       
    },
    
    
  ]
})
