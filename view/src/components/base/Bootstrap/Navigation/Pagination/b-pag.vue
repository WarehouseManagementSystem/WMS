<template>
    <nav aria-label="Page navigation">
        <ul class="pagination m-0">
            <item :disabled="startDisabled" @click.native="startClick"><slot name="start"><i :class="icon.stepBackward"></i></slot></item>
            <item :disabled="previousDisabled" @click.native="previousClick" ><slot name="previous"><i :class="icon.caretLeft"></i></slot></item>
              <slot>
                  <item
                      v-for="(value, index) in list"
                      :key="index"
                      :value="value"
                      :active="select == value"
                      :disabled="separator === value"
                      @click.native="itemClick(value)"
                  />
            </slot>
            <item :disabled="nextDisabled" @click.native="nextClick" ><slot name="next"><i :class="icon.caretRight"></i></slot></item>
            <item :disabled="endDisabled" @click.native="endClick" ><slot name="end"><i :class="icon.stepForward"></i></slot></item>
        </ul>
    </nav>
</template>

<script>
import config from '@/config/index.js'
import utilities from '@/components/utilities/index.js'

import item from './b-pag-item'

export default {
    name: 'b-pag',
    model: {
        prop: 'active',
        event: 'change',
    },
    components: { item, },
    data () {
        return {
            select: this.active || 1,
        }
    },
    props: {
        label: utilities.props.label,
        separator: {
            type: String,
            default: '-',
        },
        active: {
            type: [Number, String,],
            default: 1,
            validator: function (val) {
                return !isNaN(val) && Number(val) > 0 && Number(val) % 1 == 0
            },
        },
        start: {
            type: [Number, String,],
            default: 1,
            validator: function (val) {
                return !isNaN(val) && Number(val) > 0 && Number(val) % 1 == 0
            },
        },
        end: {
            type: [Number, String,],
            validator: function (val) {
                return !isNaN(val) && Number(val) > 0 && Number(val) % 1 == 0
            },
            required: true,
        },
        total: {
            type: [Number, String,],
            default: 10,
            validator: function (val) {
                return !isNaN(val) && Number(val) >= 10 && Number(val) % 1 == 0
            },
        },
    },
    computed: {
        icon: function () {
            return config.ui.icon
        },
        list: function () {
            let arr = []
            const start = Number(this.start), end = Number(this.end), total = Number(this.total)
            const length = end - start + 1
            if (length <= total) return Array.from({ length: length }, (v, i) => start + i )

            if (this.select < start + total) {
                if (end - 3 < start + total) {
                    arr = Array.from({ length: length}, (v, i) => start + i )
                } else {
                    arr = [
                        ...Array.from({ length: total}, (v, i) => start + i ),
                        this.separator,
                        ...Array.from({ length: 3}, (v, i) => end - i ).sort((a, b) => a - b),
                    ]
                }
            } else if (this.select > end - total) {
                if (start + 3 > end - total) {
                    arr = Array.from({ length: length}, (v, i) => start + i )
                } else {
                    arr = [
                        ...Array.from({ length: 3}, (v, i) => start + i ),
                        this.separator,
                        ...Array.from({ length: total}, (v, i) => end - i ).sort((a, b) => a - b),
                    ]
                }
            } else {
                arr = [
                    ...Array.from({ length: 3}, (v, i) => start + i ),
                    this.separator,
                    ...Array.from({ length: total - 4}, (v, i) => this.select - Math.floor((total - 4) / 2) + i ),
                    this.separator,
                    ...Array.from({ length: 3}, (v, i) => end - i ).sort((a, b) => a - b),
                ]
            }
            return arr
        },
        startDisabled: function () {
            return this.select == Number(this.start)
        },
        endDisabled: function () {
            return this.select == Number(this.end)
        },
        previousDisabled: function () {
            return this.startDisabled
        },
        nextDisabled: function () {
            return this.endDisabled
        },
    },
    methods: {
        startClick: function () {
            if (this.startDisabled) return
            this.select = Number(this.start)
        },
        endClick: function () {
            if (this.endDisabled) return
            this.select = Number(this.end)
        },
        previousClick: function () {
            if (this.previousDisabled) return
            this.select --
        },
        nextClick: function () {
            if (this.nextDisabled) return
            this.select ++
        },
        itemClick: function (value) {
            if (this.separator == value) return
            this.select = value
        },
    },
    watch: {
        active: function (value) {
            this.select = value
        },
        select: function (value) {
            this.$emit('change', value)
        },
    }
}
</script>
