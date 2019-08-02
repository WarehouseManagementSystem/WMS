<template>
    <div class="form-group">
        <drop class="form-control" :class="[objClass, readonlyClass]" ref="dropdownlist" :menu-height="menuHeight" menu-weight :trigger="trigger" :scroll="scroll">
            
            <drop-item v-if="!hideNull" ref="item" value="" text="<Pleace select...>" @click.native="click" :disabled="disabled"></drop-item>
            <drop-item 
                v-for="item in list" 
                :key="item.value" 
                :value="item.value" 
                :text="item.text" 
                :active="item.value == value" 
                :disabled="item.disabled || disabled" 
                @click.native="click"/>
        </drop>
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <b-help :info="info" />
    </div>
</template>

<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import drop from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'
import dropItem from '@/components/base/Bootstrap/Dropdown/b-dropdown-item.vue'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'
import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-dropdownlist',
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.readonly, utilities.mixins.form.validator, ],
    components: { drop, dropItem, BInfo, BHelp, },
    model: {
        prop: 'value',
        event: 'change',
    },
    data () {
        return {
            menuHeight: '0px',
            scroll: 0,
            trigger: '<Pleace select...>',
        }
    },
    props: {
        list: utilities.props.list,
        value: utilities.props.value,
        info: utilities.props.value,
        'hide-null': Boolean,
        maintain: Boolean,
        row: {
            type: [String, Number, ],
            default: 10,
            validator: function (val) {
                return !isNaN(val) && Number(val) > 0
            }
        },
    },
    mounted: function () {
        this.menuHeight = this.row * 32 + 10 + 'px'
        this.getScroll()
        this.setTrigger(this.value)
    },
    methods: {
        setTrigger: function (value) {
            if (this.maintain) return
            if (this.list && this.list.length && this.list.find)  
            {
                let obj = this.list.find(function (e) { if (e.value == value) return e })
                this.trigger = (obj && obj.text) ?  obj.text : '<Pleace select...>'
            } else {
                this.trigger = '<Pleace select...>'
            }
        },
        click: function (event) {
            this.getScroll()
            this.setTrigger(event.target.value)
            this.$emit('change', event.target.value)
            this.validator(event.target.value)
        },
        getScroll: async function () {
            await this.$nextTick()
            let index = 0
            const less = Number(this.row) / 2
            this.$el.firstChild.children[1].childNodes
                .forEach(function (node, i) { if ((node.className || node.classList) && util.dom.hasClass(node, 'active')) index = i < less ? 0 : i })
            this.scroll = (index - less) * 32 + 10
        },
        validator: function (value) {
            if (this.disabled) return // disabled 时不校验
            let e = this.$refs.dropdownlist.$el
            util.dom.removeClass(e, 'is-valid') // 移除可能的 is-valid
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e, 'is-invalid'); return }
            util.dom.removeClass(e, 'is-invalid') // 移除可能的 is-invalid
            // 当存在 valid-info slot 或 validInfo 时 
            if (Object.keys(this.$scopedSlots).includes('valid-info') || this.validInfo) util.dom.addClass(e, 'is-valid')
            this.$emit('valid')
        },
    },
}
</script>

<style>

</style>
