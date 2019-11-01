<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ text }}</a>
        <div class="dropdown-menu">
            <b-dropdown-menu :list="list" />
        </div>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BDropdownMenu from '@/components/base/Bootstrap/Dropdown/b-dropdown-menu.vue'

export default {
    name: 'b-nav-item-dropdown',
    components: { BDropdownMenu, },
    props: {
        list: utilities.props.list,
        text: utilities.props.value,
    },
}
</script>