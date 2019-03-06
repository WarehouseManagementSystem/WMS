// 添加子系统
import system from './Subsystem/system'

let routers = [
    // 主页（默认页面）
    { path: '/', name: 'home', component: async () => await import(/* webpackChunkName: "Home" */'@/Pages/Home.vue') },
    // 添加子系统
    ...system, // 系统
]

// 放在最后
// 当路由匹配不成功时会自动匹配此路由
routers.push({ path: '/*', name: '404', component: async () => await import(/* webpackChunkName: "404" */'@/Pages/404.vue') })

export default routers