<template>
    <th 
        v-if="!hideSerial" 
        class="align-middle text-center"
        data-type="serial">
        <slot>{{ number }}</slot>
    </th>
</template>

<script>
export default {
    name: 'table-serial-td',
    props: {
        number: {
            type: Number,
            validator: value => !isNaN(value) && Number(value) > 0,
        },
        hideSerial: Boolean,
    },
}
</script>