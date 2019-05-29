<template>
    <div class="form-group">
        <drop class="form-control" :class="objClass" ref="dropdownlist" menu-weight :trigger="trigger">
            <template #menu class="w-100">
                <drop-item value="" text="<Pleace select...>" @click.native="click"></drop-item>
                <drop-item 
                    v-for="item in list" 
                    :key="item.value" 
                    :value="item.value" 
                    :text="item.text" 
                    :active="item.value == value" 
                    :disabled="item.disabled" 
                    @click.native="click"/>
            </template>
        </drop>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
    </div>
    
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import drop from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'
import dropItem from '@/components/base/Bootstrap/Dropdown/b-dropdown-item.vue'

import BInfo from './b-form-info'

export default {
    name: 'b-dropdownlist',
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator, ],
    components: { drop, dropItem, BInfo, },
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        list: utilities.props.list,
        value: {
            type: [String, Number],
        },
    },
    computed: {
        trigger: function () {
            let value = this.value
            if (this.list && this.list.length && this.list.find)  
            {
                let obj = this.list.find(function (e) { if (e.value == value) return e })
                return (obj && obj.text) ?  obj.text : '<Pleace select...>'
            } else {
                return '<Pleace select...>'
            }
        },
    },
    methods: {
        click: function (event) {
            this.$emit('change', event.target.value)
            this.validator(event.target.value)
        },
        validator: function (value) {
            debugger
            let e = this.$refs.dropdownlist.$el
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e, 'is-invalid'); return }
            util.dom.removeClass(e, 'is-invalid')
            this.$emit('valid')
        },
    }

}
</script>

<style>

</style>
