<template>
    <nav id="nav" class="position-absolute container bg-light border border-dark rounded-lg shadow-lg w-50 h-75 m-1" style="min-width: 425px; max-width: 720px; z-index:1070;">
      <div class="row overflow-auto border rounded-lg h-100 p-1">
          <ul class="list-group col-4 d-inline-block overflow-auto bg-dark border border-dark rounded-lg h-100 p-0">
            <!-- 建议不多于七个汉子，超出部分会被隐藏 -->
            <div v-for="(item, index) in Subsystem" :key="index" @click="InitModules(item)">
              <router-link class="list-group-item bg-dark text-white text-decoration-none" style="cursor: default;" to="">
                <font class="text-truncate w-75 d-inline-block">{{ item }}</font>
                <i class="fas fa-caret-right w-25 text-right"></i>
              </router-link>
            </div>
          </ul>
          <ul class="list-group col-8 d-inline-block overflow-auto bg-light border border-dark rounded-lg h-100 p-0">
            <NavItem v-for="(item, index) in Modules" 
                :key="index" 
                class="NavItem"
                :model="item" >
            </NavItem>
          </ul>
        </div>
    </nav>
</template>

<script>

export default {
  name: "dropdown-menu-nav",
  data () {
    return {
      Routers: [],
      Subsystem: [],
      Modules: [],
      SubsystemName: '',
    }
  },
  components: {
    NavItem: () => import('./item')
  },
  mounted() {
    this.init()
  },
  methods: {
    init: async function () {
      await this.InitRouters()
      await this.InitSubsystem()
      if (this.Subsystem.length > 0) {
        // 默认显示第一个
        await this.InitModules(this.Subsystem[0])
      }
    },
    InitRouters: async function () {
        this.Routers = []
        await import('@/router/routes').then((conf) => {
          this.Routers = conf.Modules
        })
        if (!this.Routers) {
          console.warn('[System Error] routers is not an array')
        }
    },
    InitSubsystem: function () {
      this.Subsystem = []
      for (const item of this.Routers) {
        if (item.SubsystemName) {
          this.Subsystem.push(item.SubsystemName)
        }
      }
    },
    InitModules: function (SubsystemName) {
      this.Modules = []
      for (const item of this.Routers) {
        if (item.SubsystemName !== SubsystemName) continue
        this.Modules = [...this.Modules, ...item.Modules]
        this.SubsystemName = SubsystemName
        break
      }
    },
  },
}
</script>
