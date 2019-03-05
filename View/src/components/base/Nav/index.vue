<template>
    <nav id="nav" class="position-absolute container bg-light border border-dark rounded-lg shadow-lg w-50 h-75 m-1" style="z-index:1000;">
      <div class="row overflow-auto border rounded-lg h-100 p-1">
          <ul class="list-group col-4 d-inline-block overflow-auto bg-dark border border-dark rounded-lg h-100 p-0">
            <!-- 建议不多于七个汉子，超出部分会被隐藏 -->
            <router-link class="list-group-item bg-dark text-white text-decoration-none" to="/about">
              <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
              <i class="fas fa-caret-right w-25 text-right"></i>
            </router-link>
          </ul>
          <ul class="list-group col-8 d-inline-block overflow-auto bg-light border border-dark rounded-lg h-100 p-0">
            <!-- 建议不多于十八个汉子，超出部分会被隐藏 -->
            <router-link class="list-group-item bg-light text-dark text-decoration-none" to="/about">
              <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
              <i class="fas fa-chevron-down w-25 text-right"></i>
            </router-link>
          </ul>
        </div>
        <!-- <ul class="nav flex-column bg-light text-dark ml-1 mt-1">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">{{ $t("nav.About") }}</router-link>
          </li>
        </ul> -->
    </nav>
</template>

<script>
export default {
  name: "DropdownMenu",
  data () {
    return {
      Subsystem: [
        { name: '系统设置',
          model: [
            { name: '用户',
              model: [
                { name: '用户设置', path: '/UserSetting.vue', },
              ], 
            },
          ],
        }
      ],
    }
  }
}
</script>
