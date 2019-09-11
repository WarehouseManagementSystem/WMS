<template>
    <nav class="navbar">
        <b-nav-brand v-if="$slots.brand || brand" :text="brand"><slot name="brand"></slot></b-nav-brand>
        <b-nav-toggler v-if="$slots.toggler || !hideToggler" :target="id"><slot name="toggler"></slot></b-nav-toggler>
        <slot><b-navbar-items :id="id" :list="list" /></slot>
    </nav>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BNavBrand from './b-navbar-brand'
import BNavToggler from './b-navbar-toggler'
import BNavbarItems from './b-navbar-items'

export default {
    name: 'b-navbar',
    components: { BNavBrand, BNavToggler, BNavbarItems, },
    data () {
        return {
            id: 'Navbar-' + util.random.getRandomString()
        }
    },
    props: {
        list: utilities.props.list,
        brand: utilities.props.value,
        href: utilities.props.href,
        hideToggler: Boolean,
    },
}
</script>