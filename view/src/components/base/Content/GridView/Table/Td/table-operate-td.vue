<template>
    <th 
        class="d-print-none align-middle text-center mx-1" 
        data-type="operate" >
        <slot>
            <span 
                v-for="(item, index) in oper" 
                :key="index" 
                class="border-0 bg-transparent text-primary text-center p-0 mx-1" 
                style="cursor: pointer; font-size: 1em" 
                v-tip:tooltip="item.value.tip"
                @click="$emit('tr:oper', item.type)" >
                <i :class="item.value.icon"/>
            </span>
        </slot>
    </th>
</template>

<script>
import config from '@/config/index.js'

export default {
    name: 'table-operate-td',
    props: {
        operate: {
            type: Array,
            validator: value => value.every && value.every(e => Object.keys(config.ui.table.operate).includes(e))
        },
    },
    computed: {
        oper: function () {
            return this.operate.map(e => {return {type: e, value: config.ui.table.operate[e]}})
        },
    }
}
</script>