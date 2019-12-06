// a router

export default {
    SubsystemName: 'Demo',
    Modules: [
        { path: 'base-icon', name: 'base-icon', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/base-icon.vue'), },
        {
            SubsystemName: 'Base',
            Modules: [
                { path: 'b-badge', name: 'b-badge', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-badge-demo.vue'), },
                { path: 'b-card', name: 'b-card', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-card-demo.vue'), },
                { path: 'b-collapse', name: 'b-collapse', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-collapse-demo.vue'), },
                { path: 'b-dropdown', name: 'b-dropdown', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-dropdown-demo.vue'), },
                { path: 'b-datetime', name: 'b-datetime', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-datetime-demo.vue'), },
                { path: 'b-list', name: 'b-list', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-list-demo.vue'), },
                { path: 'b-loading', name: 'b-loading', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-loading-demo.vue'), },
                { path: 'b-modal', name: 'b-modal', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-modal-demo.vue'), },
                { path: 'b-media', name: 'b-media', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-media-demo.vue'), },
                { path: 'b-nav', name: 'b-nav', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-nav-demo.vue'), },
                { path: 'b-pagination', name: 'b-pagination', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-pagination-demo.vue'), },
                { path: 'b-progress', name: 'b-progress', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-progress-demo.vue'), },
                { path: 'b-toast', name: 'b-toast', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-toast-demo.vue'), },
                { path: 'b-scrollspy', name: 'b-scrollspy', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-scrollspy-demo.vue'), },
                { path: 'b-alert', name: 'b-alert', component: async () => await import(/* webpackChunkName: "base" */'@/Pages/Demo/Base/b-alert-demo.vue'), },
            ]
        },
        {
            SubsystemName: 'Content',
            Modules: [
                { path: 'c-a', name: 'c-a', component: async () => await import(/* webpackChunkName: "content" */'@/Pages/Demo/Content/c-a-demo.vue'), },
                { path: 'c-table', name: 'c-table', component: async () => await import(/* webpackChunkName: "content" */'@/Pages/Demo/Content/c-table-demo.vue'), },
                { path: 'tree-view', name: 'tree-view', component: async () => await import(/* webpackChunkName: "content" */'@/Pages/Demo/Content/tree-view-demo.vue'), },
            ],
        },
        
        {
            SubsystemName: 'Form',
            Modules: [
                { path: 'b-text', name: 'b-text', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-text-demo.vue'), },
                { path: 'b-textarea', name: 'b-textarea', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-textarea-demo.vue'), },
                { path: 'b-number', name: 'b-number', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-number-demo.vue'), },
                { path: 'b-radio', name: 'b-radio', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-radio-demo.vue'), },
                { path: 'b-checkbox', name: 'b-checkbox', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-checkbox-demo.vue'), },
                { path: 'b-checkbox-tree', name: 'b-checkbox-tree', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-checkbox-tree-demo.vue'), },
                { path: 'b-switch', name: 'b-switch', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-switch-demo.vue'), },
                { path: 'b-range', name: 'b-range', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-range-demo.vue'), },
                { path: 'b-select', name: 'b-select', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-select-demo.vue'), },
                // { path: 'b-hidden', name: 'b-hidden', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-hidden-demo.vue'), },
                { path: 'b-button', name: 'b-button', component: async () => await import(/* webpackChunkName: "form" */'@/Pages/Demo/Form/b-button-demo.vue'), },
                
            ]
        },
        {
            SubsystemName: 'Box',
            Modules: [
                { path: 'box-accordion', name: 'box-accordion', component: async () => await import(/* webpackChunkName: "box" */'@/Pages/Demo/Box/box-accordion-demo.vue'), },
                { path: 'box-tabs', name: 'box-tabs', component: async () => await import(/* webpackChunkName: "box" */'@/Pages/Demo/Box/box-tabs-demo.vue'), },
            ]
        },
        {
            SubsystemName: 'Directive',
            Modules: [
                { path: 'v-tip', name: 'v-tip', component: async () => await import(/* webpackChunkName: "directive" */'@/Pages/Demo/Directive/b-tooltip-demo.vue'), },
            ]
        },
        
    ],
}