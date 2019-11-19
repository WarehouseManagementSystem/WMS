import Vue from 'vue'
import Router from 'vue-router'
// 添加子系统
import Subsystem from './routes'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // 主页（默认页面）
        { path: '/', name: 'home', component: async () => await import(/* webpackChunkName: "Home" */'@/Pages/Home.vue'), hide: true, },
        // 添加子系统
        ...Subsystem,
        // 放在最后
        // 当路由匹配不成功时会自动匹配此路由
        { path: '/*', name: '404', component: async () => await import(/* webpackChunkName: "404" */'@/Pages/404.vue'), hide: true }
    ],
})
