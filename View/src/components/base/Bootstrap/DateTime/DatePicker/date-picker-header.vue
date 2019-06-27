<template>
    <header>
        <font class="row text-center mx-1">
            <base-button class="col font-weight-bold border-0 bg-white text-body h5" style="height: 2.5em" :value="hearderText" @click.stop="$emit('clickHeader')"></base-button>
            <base-button class="fas fa-angle-left border-0 bg-white text-muted" style="height: 2.5em" :disabled="disabled" value="" @click.stop="$emit('forward')"></base-button>
            <base-button class="fas fa-circle border-0 bg-white text-muted" style="height: 2.5em" :disabled="disabled || nowDisabled" value="" @click.stop="$emit('checknow')"></base-button>
            <base-button class="fas fa-angle-right border-0 bg-white text-muted" style="height: 2.5em" :disabled="disabled"  value="" @click.stop="$emit('backward')"></base-button>
        </font>
    </header>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import baseButton from '@/components/base/Bootstrap/Button/b-button.vue'

export default {
    name: 'date-picker-header',
    components: { baseButton, },
    props: {
        hearderText: utilities.props.value,
        disabled: utilities.props.disabled,
        nowDisabled: utilities.props.disabled,
    },
}
</script>
