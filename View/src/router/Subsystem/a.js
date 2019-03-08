// a router

let routers = [
    { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue') },
    { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue') },
]

export { routers as aRouters }