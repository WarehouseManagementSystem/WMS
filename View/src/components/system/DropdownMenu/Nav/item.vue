<template>
    <!-- Nav Item template -->
    <li>
        <template v-for="(item, index) in model">
            <!-- 建议不多于十八个汉子，超出部分会被隐藏 -->
            <router-link class="list-group-item bg-light text-dark text-decoration-none" :key="index" v-if="!item.Modules" :to="item.path">
                <font class="text-truncate w-100 d-inline-block">{{ item.name }}</font>
            </router-link>
            <template v-else>
                <div :key="index" @click="toggle">
                    <router-link class="list-group-item bg-light text-dark text-decoration-none" to="">
                        <font class="text-truncate w-75 d-inline-block">{{ item.SubsystemName }}</font>
                        <i class="fas fa-chevron-down w-25 text-right" v-if="!open"></i>
                        <i class="fas fa-chevron-up w-25 text-right" v-else></i>
                    </router-link>
                </div>
                <ul v-show="open" :key="index">
                    <!-- <router-link class="list-group-item bg-light text-dark text-decoration-none" to="/System-About">
                        <font class="text-truncate w-75 d-inline-block">{{ $t("nav.About") }}</font>
                        <i class="fas fa-chevron-down w-25 text-right"></i>
                    </router-link> -->
                    <item
                        class="NavItem"
                        v-for="(Module, key) in item.Modules"
                        :key="key"
                        :model="[Module]" />
                </ul>
            </template>
        </template>
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
            open: false,
        }
    },
    props: {
      model: Array
    },
    methods: {
        toggle: function () {
            this.open = !this.open
        }
    },
    watch: {
        model: function (newValue, oldValue) {
            if (newValue === oldValue) {
                this.model = newValue
                this.open = false
            }

        }
    }
}
</script>
