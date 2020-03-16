// Plugin
export default {
    SubsystemName: 'Plugin',
    hide: true,
    Modules: [
        { path: 'Print', name: 'Print', component: async () => await import(/* webpackChunkName: "Plugin" */'@/components/Plugin/Print.vue'), },
    ],
}