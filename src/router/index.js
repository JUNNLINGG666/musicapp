import Vue from 'vue'
import VueRouter from 'vue-router'
import { ShareSheet } from 'vant';
import { Button } from 'vant';
import 'vant/lib/index.css'

Vue.use(Button);

Vue.use(ShareSheet);


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Recommend',
    component:()=>import('../views/Recommend')
  },
  {
    path:'/playlist/:id/:num',
    name:'PlayList',
    component:()=>import('../views/PlayList')
  },
  // {
  //   path:'/hot',
  //   name:'HotMusic',
  //   component:()=>import('../views/HotMusic')
  // },
  {
    path:'/hot/:num',
    name:'HotMusic',
    component:()=>import('../views/HotMusic')
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search')
  },
  {
    path:'/comments/:page',
    name:'Comments',
    component:()=>import('../components/Comments')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
