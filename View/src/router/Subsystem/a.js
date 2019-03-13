// a router

let routers = [
    { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), base: 'ab' },
    { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'), base: 'ac-ad' },
]

export { routers as aRouters }