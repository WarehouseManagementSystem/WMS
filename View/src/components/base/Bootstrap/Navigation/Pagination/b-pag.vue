<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <item :disabled="startDisabled" @click.native="startClick"><slot name="start"><i class="fas fa-step-backward"></i></slot></item>
            <item :disabled="previousDisabled" @click.native="previousClick" ><slot name="previous"><i class="fas fa-caret-left"></i></slot></item>
            <item 
                v-for="item in list" 
                :key="item" 
                :value="item" 
                :active="select == item" 
                :disabled="separator === item" 
                @click.native="itemClick(item)" 
            />
            <item :disabled="nextDisabled" @click.native="nextClick" ><slot name="next"><i class="fas fa-caret-right"></i></slot></item>
            <item :disabled="endDisabled" @click.native="endClick" ><slot name="end"><i class="fas fa-step-forward"></i></slot></item>
        </ul>
    </nav>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import item from './b-pag-item'

export default {
    name: 'b-pag',
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
            default: '...',
        },
        active: {
            type: Number,
            default: 1,
            validator: function (val) {
                return val > 0 && val % 1 == 0
            },
        },
        start: {
            type: Number,
            default: 1,
            validator: function (val) {
                return val > 0 && val % 1 == 0
            },
        },
        end: {
            type: Number,
            validator: function (val) {
                return val > 0 && val % 1 == 0
            },
            required: true,
        },
        total: {
            type: Number,
            default: 10,
            validator: function (val) {
                return val >= 6 && val % 1 == 0
            },
        },
    },
    computed: {
        list: function () {
            const length = this.end - this.start + 1
            let left = this.total / 2
            if (this.select < this.total / 2 * 3) left = this.total - this.select
            const right = this.total - left
            return length > this.total 
            ? [
                ...Array.from({ length: left }, (v, i) => this.select + i ),
                this.separator,
                ...Array.from({ length: right }, (v, i) => this.end - i ).sort(),
            ]
            : Array.from({ length: length }, (v, i) => this.start + i ) 
        },
        startDisabled: function () {
            return this.select == this.start
        },
        endDisabled: function () {
            return this.select == this.end
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
            this.select = this.start
        },
        endClick: function () {
            if (this.endDisabled) return
            this.select = this.end
        },
        previousClick: function () {
            if (this.previousDisabled) return
            this.select --
        },
        nextClick: function () {
            if (this.nextDisabled) return
            this.select ++
        },
        itemClick: function (item) {
            this.select = item
        },
        
    }
}
</script>