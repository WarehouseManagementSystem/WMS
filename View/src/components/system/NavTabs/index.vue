<template>
    <div>
        <div v-for="item in Paths" :key="item.index" class="d-inline-flex overflow-auto">
            <div class="btn btn-dark text-truncate d-inline-block px-1" v-if="item.pathInfo.name && item.pathInfo.path" role="button">
                <i class="fas fa-times-circle text-secondary align-self-center px-1" @click.stop="CloseTab(item)"></i>
                <router-link class="text-truncate text-decoration-none text-center d-inline-flex" style="min-width: 3rem;" :class="[ $route.path == item.pathInfo.path ? 'text-primary' : 'text-light' ]" :to="item.pathInfo.path" >
                    <font class="px-1 align-self-center px-1">{{ item.pathInfo.name }}</font>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/index'
import util from '@/util/index.js'

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

export default {
    name: 'NavTabs',
    data () {
        return {
            Paths: pathList,
        }
    },
    created () {
        // 使用 sessionStorage 保持用户打开的页面数据，防止刷新时丢失，在会话结束时销毁（暂缓）
        pathList.push(...util.JSON.parse(sessionStorage.getItem('System_NavTabs_PathList')) || [])
    },
    beforeUpdate () {
        sessionStorage.setItem('System_NavTabs_PathList', util.JSON.stringify(pathList))
    },
    methods: {
        CloseTab: function (willClose) {
            this.removePath(willClose.pathInfo.path)
            // 如果关闭的标签是刚刚跳转的地址，则路由回退到上一个跳转的低着
            if (this.$route.path == willClose.pathInfo.path) {
                if (pathList.length > 0) {
                    let arr = pathList.slice(0)
                    // 将地址数组按点击的先后顺序进行反向排序（a.index - b.index 越迟被点击的差值越大，就会排的越靠后），取最后一个进行跳转
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
    },
}
</script>
