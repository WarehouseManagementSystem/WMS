<template>
    <div>
        <div v-for="(item, index) in Paths" :key="index" class="d-inline-flex overflow-auto">
            <router-link class="btn btn-dark text-truncate d-inline-block" style="min-width:5rem;" :to="item.path" role="button" >
                <font class="px-1 align-self-center">{{ item.name }}</font>
            </router-link>
            <i class="fas fa-times-circle text-secondary align-self-center" @click.stop="CloseTab(item.path)"></i>
        </div>
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
            this.removePath(url)
            // 如果关闭的标签是刚刚跳转的地址，则路由回退到上一个跳转的低着
            if (this.$route.path == url) {
                 window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            }
        },
        removePath: function (url) {
            for (let n = 0; n < paths.length; n++) {
                if (paths[n].path == url) {
                    paths.splice(n, 1)
                    break
                }
            }
        }
    }
}

import router from '@/router/index'

let paths = []
router.afterEach((to, from) => {
                           debugger
    if (to && to.path != '/' && to != from) {
        let flag = false
        for (const item of paths) {
            if (item.path == to.path) { 
                flag = true
                break
            }
        }
        if (!flag) {
            paths.push(to)
        }
    }
})

</script>
