<template>
    <datalist :id="id">
        <template v-for="(value, index) in datalist">
            <option :value="value" :key="index" />
        </template>
    </datalist>
</template>
<script>
import utilities from '@/components/utilities/index.js'

export default {
    name: 'b-datalist',
    props: {
        id: {
            type: String,
            required: true,
        },
        datalist: utilities.props.list,
    },
}
</script>
