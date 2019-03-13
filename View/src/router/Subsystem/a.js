// a router

export default {
    SubsystemName: 'a',
    Modules: [
        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), },
        {
            SubsystemName: 'ab',
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), },
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'), },
            ]
        }
    ],
}