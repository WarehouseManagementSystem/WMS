<template>
    <b-dropdown v-if="list.length > 0" trigger="Theme" :list="list" :select="theme" @menuClick="menuClick" />
</template>

<script>
import BDropdown from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'

export default {
    name: 'theme-select',
    components: { BDropdown, },
    data () {
        return {
            list: [], 
            theme: localStorage.theme,
        }
    },
    async created () {
        let themeList = await JSON.parse(await this.$theme.getThemesList())
        this.list = themeList.map && themeList.map(e => ({value: e.name}))
        this.list.unshift({value: this.$theme.defaultTheme})
    },
    methods: {
        menuClick: function (item) {
            this.theme = item.value
        }
    },
    watch: {
        theme: function (value) {
            this.$theme.setTheme(value)
        }
    }
}
</script>