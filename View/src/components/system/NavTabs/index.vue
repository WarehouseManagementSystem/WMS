<template>
    <div>
        <router-link class="btn btn-dark text-truncate d-inline-block" style="min-width:5rem;" :to="item.path" role="button" v-for="(item, index) in Paths" :key="index">
            <i class="fas fa-times-circle text-secondary" @click="CloseTab(item.path)"></i>
            <font class="px-1">item.name</font>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NavTabs',
    data () {
        return {
            Paths: paths,
        }
    },
    methods: {
        CloseTab: function (url) {
            for (let i = 0;i < paths.length; i++) {
                if (paths[i].path == url) {
                    paths.splice(i ,1)
                    router.go(-1)
                    break
                }
            }
        }
    }
}

import router from '@/router/index'

let paths = []
router.afterEach((to, from) => {
    if (to && to.path != '/' && to != from) {
        let path = { name: to.name, path: to.path }
        if (JSON.stringify(paths).indexOf(JSON.stringify(path)) == -1) {
            paths.push(path)
        }
    }
})

</script>
