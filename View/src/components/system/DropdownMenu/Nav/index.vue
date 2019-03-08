<template>
    <nav id="nav" class="position-absolute container bg-light border border-dark rounded-lg shadow-lg w-50 h-75 m-1" style="z-index:1000;">
      <div class="row overflow-auto border rounded-lg h-100 p-1">
          <ul class="list-group col-4 d-inline-block overflow-auto bg-dark border border-dark rounded-lg h-100 p-0">
            <!-- 建议不多于七个汉子，超出部分会被隐藏 -->
            <li class="list-group-item bg-dark text-white text-decoration-none" v-for="(item, index) in Subsystem" :key="index">
              <font class="text-truncate w-75 d-inline-block">{{ item.base }}</font>
              <i class="fas fa-caret-right w-25 text-right"></i>
            </li>
          </ul>
          <ul class="list-group col-8 d-inline-block overflow-auto bg-light border border-dark rounded-lg h-100 p-0">
            <!-- 建议不多于十八个汉子，超出部分会被隐藏 -->
            <router-link class="list-group-item bg-light text-dark text-decoration-none" to="/System-About">
              <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
              <i class="fas fa-chevron-down w-25 text-right"></i>
            </router-link>
          </ul>
        </div>
    </nav>
</template>

<script>
import routers from '@/router/routes'

export default {
  name: "DropdownMenuNav",
  data () {
    return {
      routers: routers,
    }
  },
  computed: {
    path: function () {
      let array = []
      if (this.routers) {
        for (let item in this.routers) {
          console.log(item)
          if (!item.unDisplay && item.base) {
            // console.log(Array.path(item))
            array.path(item)
          }
        }
      }
      return array
    },
    Subsystem: function () {
      if (this.path) {
        for (let item in this.path) {
          return item.base
        }
      }
      return ''
    },
  }
}
</script>
