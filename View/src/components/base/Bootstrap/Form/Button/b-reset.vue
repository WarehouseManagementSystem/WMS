<template>
    <input 
        type="reset" 
        class="btn" 
        :class="objClass" 
        :value="value | worldUpperCase | firstUpperCase" 
        :disabled="disabled" 
        :aria-disabled="disabled"
        data-toggle="reset" />
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-reset',
    mixins: [ utilities.mixins.form.btn, ],
    props: {
        value: {
            ...utilities.props.value,
            default: `Reset`,
        },
    },
}
</script>