<template>
    <!-- Nav Item template -->
    <li>
       <!-- 建议不多于十八个汉子，超出部分会被隐藏 -->
        <router-link class="list-group-item bg-light text-dark text-decoration-none" :to="path">
            <font class="text-truncate w-75 d-inline-block" @click="open = !open">{{ name }}</font>
            <i class="fas fa-chevron-down w-25 text-right" v-if="isFolder"></i>
        </router-link>
        <ul  v-show="open" v-if="isFolder">
             <!-- <router-link class="list-group-item bg-light text-dark text-decoration-none" to="/System-About">
                <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
                <i class="fas fa-chevron-down w-25 text-right"></i>
            </router-link> -->
            <item
                class="NavItem"
                v-for="(item, index) in children"
                v-if="item.base.split('-').length > 0"
                :key="index"
                :model="[item]" />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'DropdownMenuNavItem',
    components: {
        item: () => import('./item.vue')
    },
    data () {
        return {
            path: '',
            name: '',
            isFolder: false,
            open: false,
            children: [],
            //Modules: [],
        }
    },
    props: {
      model: Array
    },
    created() {
        this.Modules()
    },
    methods: {
        Modules: function () {
            this.children = []
            for (const item of this.model) {
                if (item.base.split('-').length > 0) {
                    this.path = ''
                    this.isFolder = true
                    item.base = item.base.substring(item.base.split('-')[0].length + 1)
                    this.name = item.base.split('-')[0]
                    this.children.push(item)
                } else {
                    this.path = item.path
                    this.isFolder = false
                    this.name = item.name
                }
            }
            return this.children
        },
        // FormatModules: function () {
        //     for (const item of this.model) {
        //         if (item.base.split('-').length > 0) {

        //         }
        //     }
        // },
    },
    watch: {
        model: function () {
            this.Modules()
        }
    }
}
</script>
