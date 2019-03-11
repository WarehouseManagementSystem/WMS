<template>
    <nav id="nav" class="position-absolute container bg-light border border-dark rounded-lg shadow-lg w-50 h-75 m-1" style="z-index:1000;">
      <div class="row overflow-auto border rounded-lg h-100 p-1">
          <ul class="list-group col-4 d-inline-block overflow-auto bg-dark border border-dark rounded-lg h-100 p-0">
            <!-- 建议不多于七个汉子，超出部分会被隐藏 -->
            <router-link class="list-group-item bg-dark text-white text-decoration-none" to="" v-for="(item, index) in Subsystem" :key="index">
              <font class="text-truncate w-75 d-inline-block" @click="showItem(item)">{{ item }}</font>
              <i class="fas fa-caret-right w-25 text-right"></i>
            </router-link>
          </ul>
          <ul class="list-group col-8 d-inline-block overflow-auto bg-light border border-dark rounded-lg h-100 p-0">
            <NavItem
                class="NavItem"
                >
            </NavItem>
          </ul>
        </div>
    </nav>
</template>

<script>

export default {
  name: "DropdownMenuNav",
  data () {
    return {
      Routers: []
    }
  },
  components: {
    NavItem: () => import('./item')
  },
  computed: {
    Subsystem: function () {
      let array = []
      for (let item of this.Routers) {
        // 去重
        if (array.includes(item.base.split('-')[0])) continue
        array.push(item.base.split('-')[0])
      }
      return array
    },
    Modules: function () {
      return ''
    }
  },
  mounted() {
    this.InitRouters()
  },
  methods: {
    InitRouters: async function () {
      let routers = []
      await import('@/router/routes').then((conf) => {
        routers = conf.default
      })
      if (!routers) {
        console.warn('[System Error] routers is not an array')
        return this.Routers
      }
      for (let item of routers) {
        // 排除
        // 1. 不显示在主菜单的链接（unDisplay: true）
        // 2. 不合法的路由（路由需按 @/router/routes.js 中的方式进行引入，
        //    使用 util.Subsystem(<Subsystem-name>, <routers>) 方法会为路由加上 base: <Subsystem-name>,请勿自主添加）
        // 3. 如若子系统中的路由全部设置为 unDisplay: true（默认为 false）或子系统中路由为空则不会显示该子系统
        if (!item.unDisplay && item.base) {
          this.Routers.push(item)
        }
      }
    },
    showItem: function (base) {
      console.log(base)
    },
  }
}
</script>
