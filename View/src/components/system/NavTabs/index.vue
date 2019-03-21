<template>
    <div>
        <div v-for="item in Paths" :key="item.index" class="d-inline-flex overflow-auto"> <!-- border border-top-0 border-left-0 border-right-0 border-danger -->
            <router-link class="btn btn-dark text-truncate d-inline-block" :class="[ $route.path === item.pathInfo.path ? active : '' ]" style="min-width:5rem;" :to="item.pathInfo.path" role="button" >
                <font class="px-1 align-self-center">{{ item.pathInfo.name }}</font>
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
            active: 'text-primary',
        }
    },
    mounted() {
        // 使用 sessionStorage 保持用户打开的页面数据，防止刷新时丢失，在会话结束时销毁（暂缓）
    },
    methods: {
        CloseTab: function (willClose) {
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
        },
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

<style langg="scss">
   
</style>
