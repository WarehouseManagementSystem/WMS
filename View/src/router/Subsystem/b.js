// a-b router

export default {
    SubsystemName: 'b',
    Modules: [
        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), },
        {
            SubsystemName: 'ab',
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), },
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'), },
                {
                    SubsystemName: 'abc',
                    Modules: [
                        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/Pages/About.vue'), },
                        { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/Pages/Default.vue'), },
                    ]
                },
            ]
        }
    ]
}