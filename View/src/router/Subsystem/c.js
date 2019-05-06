// c router

export default {
    SubsystemName: 'c',
    // hide: true,
    // 此处添加 则 ‘c’ 子系统均不会在主菜单中显示
    Modules: [
        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'),},
        { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'), hide: true},
        {
            SubsystemName: 'cb1',
            // hide: true,
            // 此处添加 则 ‘cb1’ 子系统均不会在主菜单中显示
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), hide: true},
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'),},
            ]
        },
        {
            SubsystemName: 'cb2',
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'),},
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'),},
            ]
        }
    ]
}
