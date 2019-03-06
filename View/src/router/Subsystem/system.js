// system router
export default [
    {
        path: '/about', name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue')
    },
]
