<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{ text }}</a>
        <div class="dropdown-menu">
            <d-menu :list="list"></d-menu>
        </div>
    </li>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import DMenu from '@/components/base/Bootstrap/Dropdown/b-dropdown-menu.vue'

export default {
    name: 'b-nav-item-dropdown',
    components: { DMenu, },
    props: {
        list: utilities.props.list,
        text: utilities.props.value,
    },
}
</script>