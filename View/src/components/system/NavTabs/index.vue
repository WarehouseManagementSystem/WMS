<template>
    <div>
        <div v-for="(item, index) in Paths" :key="index" class="d-inline-flex overflow-auto">
            <router-link class="btn btn-dark text-truncate d-inline-block" style="min-width:5rem;" :to="item.pathInfo.path" role="button" >
                <font class="px-1 align-self-center">{{ item.pathInfo.path }}</font>
            </router-link>
            <i class="fas fa-times-circle text-secondary align-self-center" @click.stop="CloseTab(item)"></i>
        </div>
    </div>
</template>

<script>
import util from '@/util/index'
import router from '@/router/index'

export default {
    name: 'NavTabs',
    data () {
        return {
            Paths: pathList,
        }
    },
    methods: {
        CloseTab: function (willClose) {
            debugger
            this.removePath(willClose.pathInfo.path)
            // 如果关闭的标签是刚刚跳转的地址，则路由回退到上一个跳转的低着
            if (this.$route.path == willClose.pathInfo.path) {
                if (pathList.length > 0) {
                    let arr = util.global.clone(pathList, false)
                    this.$router.push(arr.sort((a, b) => a.index - b.index)[arr.length - 1].pathInfo.path)
                } else {
                    this.$router.push('/')
                }
            }
        },
        removePath: function (url) {
            for (let n = 0; n < pathList.length; n++) {
                if (pathList[n].pathInfo.path == url) {
                    pathList.splice(n, 1)
                    break
                }
            }
        }
    }
}

let pathList = [], maxHistory = 0
router.afterEach((to, from) => {
    if (to && to.path != '/' && to != from) {
        let flag = false
        for (const item of pathList) {
            if (item.pathInfo.path == to.path) { 
                item.index = ++maxHistory
                flag = true
                break
            }
        }
        if (!flag) {
            pathList.push({ pathInfo: to, index: ++maxHistory} )
        }
    }
})

</script>
