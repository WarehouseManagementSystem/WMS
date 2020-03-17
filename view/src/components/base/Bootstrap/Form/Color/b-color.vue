<template>
    <b-drop-picker placeholder="请选择">
        <div style="width:100%; height:300px;" :style="color"></div>
    </b-drop-picker>
</template>

<script>
import BDropPicker from '@/components/base/Bootstrap/DropdownPicker/b-dropdownpicker.vue'

export default {
    name: 'b-color',
    components: { BDropPicker, },
    data () {
        return {
            color: {background: `linear-gradient(to bottom, hsl(0,100%,100%), #ffffff)`},
        }
    }
}
</script>