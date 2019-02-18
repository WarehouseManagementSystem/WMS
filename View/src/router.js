import Vue from 'vue'
import Router from 'vue-router'
import Hone from '@/Pages/Home.vue'

Vue.use(Router)

export default  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Hone },
    {
      path: '/about', name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */'@/Pages/About.vue')
    },
    { path: '/*', name: '404', component: () => import('@/Pages/404.vue') },
  ]
 })
