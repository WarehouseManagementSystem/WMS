<template>
    <div class="Form">
        <h2>b-hidden(hidden 为隐藏元素)</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-hidden class="col-11" v-model="value"></b-hidden>
        </div>
    </div>
</template>

<script>
import BHidden from '@/components/base/Bootstrap/Form/b-hidden.vue'

export default {
    name: 'b-hidden-demo',
    components: { BHidden, },
    data () {
        return {
            value: 'uid',
        }
    }
}
</script>
