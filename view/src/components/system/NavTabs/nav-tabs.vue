<template>
    <div>
        <div v-for="(item, index) in Paths" :key="index" class="container overflow-auto px-0">
            <div class="btn btn-primary text-truncate d-flex justify-content-between align-items-center px-1" role="button"
                :class="{ active: $route.path == item.pathInfo.path }" 
                v-if="item.pathInfo.name && item.pathInfo.path" 
                @click.right="mouseRightClick(event, item)" 
                @dblclick="$router.replace(item.pathInfo)">
                <router-link class="text-white text-truncate text-decoration-none text-center" style="min-width: 3rem;" :to="item.pathInfo.path" >
                    <font class="px-1 px-1">{{ item.pathInfo.name }}</font>
                </router-link>
                <i class="fas fa-times-circle px-1" style="font-size: 0.8em" @click.stop="closeTab(item, 'closeIco')"></i>
            </div>
        </div>
        <!-- 右键菜单 -->
        <ul class="list-group p-1" v-show="isShow" style="position: absolute; z-index: 1050" :style="{ 'top': top, 'left': left }">
            <li class="list-group-item list-group-item-action btn p-1" role="button" @mousedown="closeTab(RightClickItem, 'rigthClick')">
                <font class="text-truncate text-decoration-none text-center text-muted d-inline-block" >Close</font>
            </li>
            <li class="list-group-item list-group-item-action btn p-1" role="button" @mousedown="closeOthers(RightClickItem)">
                <font class="text-truncate text-decoration-none text-center text-muted d-inline-block" >Close Others</font>
            </li>
            <li class="list-group-item list-group-item-action btn p-1" role="button" @mousedown="closeAll">
                <font class="text-truncate text-decoration-none text-center text-muted d-inline-block" >Closs All</font>
            </li>
        </ul>
    </div>
</template>

<script>
import router from '@/router/index'

export default {
    name: 'nav-tabs',
    data () {
        return {
            pathList: [],
            maxHistory: 0,
            Paths: [],
            RightClickItem: null,
            top: '0px',
            left: '0px',
            isShow: false,
        }
    },
    created () {
        router.afterEach((to, from) => {
            if (to && to.path != '/' && to != from) {
                let flag = false
                for (const item of this.pathList) {
                    if (item.pathInfo.path == to.path) { 
                        item.index = ++this.maxHistory
                        flag = true
                        break
                    }
                }
                if (!flag)  this.pathList.push({ pathInfo: to, index: ++this.maxHistory} )
            }
        })
        this.Paths = this.pathList
        this.$nextTick(() => { // 使用 sessionStorage 保持用户打开的页面数据，防止刷新时丢失，在会话结束时销毁（暂缓）
            if (sessionStorage.System_NavTabs_PathList) this.pathList.push(...JSON.parse(sessionStorage.System_NavTabs_PathList) || [])
        })
    },
    methods: {
        removePath: function (url) {
            for (let n = 0; n < this.pathList.length; n++) {
                if (this.pathList[n].pathInfo.path == url) {
                    this.pathList.splice(n, 1)
                    break
                }
            }
        },
        // 关闭标签
        closeTab: function (willClose, type = '') {
            if (!(willClose && willClose.pathInfo)) return
            // 通过右键菜单调用
            if (type == 'rigthClick') this.rightContextHiden()
            this.removePath(willClose.pathInfo.path)
            // 关闭的标签不是当前所在的地址，直接返回
            if (this.$route.path != willClose.pathInfo.path) return
            // 关闭的标签是当前所在的地址，则路由回退最近访问的地址
            if (this.pathList.length == 0) {
                this.$router.push('/')
            } else {
                let arr = this.pathList.slice(0)
                // 将地址数组按点击的先后顺序进行反向排序（a.index - b.index 越迟被点击的差值越大，就会排的越靠后），取最后一个进行跳转
                let item = Object.assign({}, arr.sort((a, b) => a.index - b.index)[arr.length - 1].pathInfo)
                this.$router.push(item.path)
            }
        },
        // 关闭其他
        closeOthers: function (item) {
            if (!(item && item.pathInfo)) return
            // 清空数组（pathList = [] vue 无法追踪变化）
            this.maxHistory = 0
            this.pathList.splice(0, this.pathList.length)
            this.pathList.push({ pathInfo: item.pathInfo, index: ++this.maxHistory })
            // 未关闭的标签是当前所在的地址不跳转
            if (this.$route.path == item.pathInfo.path) return
            // 未关闭的标签不是当前所在的地址
            this.$router.push(item.pathInfo.path)
        },
        // 全部关闭
        closeAll: function () {
            // 清空数组（pathList = [] vue 无法追踪变化）
            this.pathList.splice(0, this.pathList.length)
            this.maxHistory = 0
            this.$router.push('/')
        },
         // 绑定隐藏菜单事件
        bindHideEvents () {
            document.addEventListener('mousedown', this.rightContextHiden)
            document.addEventListener('mousewheel', this.rightContextHiden)
        },
        // 取消绑定隐藏菜单事件
        unbindHideEvents () {
            document.removeEventListener('mousedown', this.rightContextHiden)
            document.removeEventListener('mousewheel', this.rightContextHiden)
        },
        // 鼠标右键点击事件
        mouseRightClick: function (event, item) {
            // 禁用右键菜单
            document.oncontextmenu = new Function("return false;")
            const e = event || window.event
            this.top = (e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) + 'px'
            this.left = (e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) + 'px'
            this.isShow = true
            this.RightClickItem = item
        },
        // 隐藏右键菜单
        rightContextHiden: function () {
            this.isShow = false
            this.RightClickItem = null
            // 启用右键菜单
            document.oncontextmenu = new Function("return true;")
        },
    },
    watch: {
        isShow: function (newValue) {
            newValue ? this.bindHideEvents() : this.unbindHideEvents()
        },
        'pathList.length': function () {
            sessionStorage.System_NavTabs_PathList = JSON.stringify(this.pathList)
        }
    },
}
</script>
