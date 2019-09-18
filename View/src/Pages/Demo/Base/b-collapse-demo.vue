<template>
    <div>
        <h2>b-collapse</h2>
        <hr>
        <a class="btn btn-primary" role="button" v-coll:control="'#el'">Toggle first element</a>
        <button class="btn btn-primary" type="button" v-coll:[control]="'#el'" >Toggle second element</button>
        <b-collapse id="el">
            content
        </b-collapse>
    </div>
</template>

<script>
import BCollapse from '@/components/base/Bootstrap/Collapse/index.js'

export default {
    name: 'b-collapse-demo',
    components: { BCollapse,},
    data () {
        return {
            control: 'control info'
        }
    }
}
</script>