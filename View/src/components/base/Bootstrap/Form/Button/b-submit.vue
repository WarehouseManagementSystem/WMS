<template>
    <input 
        type="submit" 
        class="btn" 
        :class="objClass" 
        :value="value | worldUpperCase | firstUpperCase" 
        :disabled="disabled" 
        :aria-disabled="disabled"
        data-toggle="submit" />
</template>

<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-submit',
    mixins: [ utilities.mixins.form.btn, ],
    props: {
        value: {
            ...utilities.props.value,
            default: `Submit`,
        },
    },
}
</script>