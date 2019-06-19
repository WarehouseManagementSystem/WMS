<template>
    <div class="form-group">
        <drop class="form-control" :class="objClass" ref="dropdownlist" :menu-height="menuHeight" menu-weight :trigger="trigger" :scroll="scroll">
            <template #menu>
                <drop-item v-if="!hideNull" ref="item" value="" text="<Pleace select...>" @click.native="click"></drop-item>
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

import BInfo from '@/components/base/Bootstrap/FormConter/b-form-info'

export default {
    name: 'b-dropdownlist',
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator, ],
    components: { drop, dropItem, BInfo, },
    model: {
        prop: 'value',
        event: 'change',
    },
    data () {
        return {
            menuHeight: '0px',
            scroll: 0,
        }
    },
    props: {
        list: utilities.props.list,
        value: {
            type: [String, Number],
        },
        'hide-null': {
            type: Boolean,
            default: false,
        },
        row: {
            type: Number,
            default: 10,
            validator: function (val) {
                return val > 0 && /^\d+$/.test(val)
            }
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
    mounted: function () {
        this.menuHeight = this.row * 32 + 10 + 'px'
        this.getScroll()
    },
    methods: {
        click: function (event) {
            this.getScroll()
            this.$emit('change', event.target.value)
            this.validator(event.target.value)
        },
        getScroll: async function () {
            await this.$nextTick()
            let index = 0
            const less = this.row / 2
            this.$el.firstChild.children[1].childNodes
                .forEach(function (node, i) { if ((node.className || node.classList) && util.dom.hasClass(node, 'active')) index = i < less ? 0 : i })
            this.scroll = (index - less) * 32 + 10
        },
        validator: function (value) {
            let e = this.$refs.dropdownlist.$el
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e, 'is-invalid'); return }
            util.dom.removeClass(e, 'is-invalid')
            this.$emit('valid')
        },
    },
}
</script>

<style>

</style>
