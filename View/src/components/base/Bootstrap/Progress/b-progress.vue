<template>
    <div>
        <div class="progress">
            <template v-if="list && list.length > 0" >
                <b-progress-bar 
                    v-for="(item, index) in list" 
                    :key="index" 
                    :value="item.value" 
                    :color="item.color || color" 
                    :striped="striped" 
                    :animated="animated" 
                ></b-progress-bar>
                <span v-if="showValue" class="text-white position-absolute" :style="spanStyle">{{ `${sum}%` }}</span>
            </template>
            <b-progress-bar v-else :color="color" :value="now" :showValue="showValue" :striped="striped" :animated="animated"></b-progress-bar>
        </div>
        <b-help :info="info" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BProgressBar from '@/components/base/Bootstrap/Progress/b-progress-bar.vue'
import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-progress',
    components: { BProgressBar, BHelp, },
    data () {
        return {
            spanStyle: {},
            now: this.value
        }
    },
    props: {
        list: utilities.props.list,
        color: utilities.props.color,
        info: utilities.props.value,
        value: {
            type: [Number, String],
            default: 0,
            validator: function (val) {
                return !isNaN(val) && val >= 0 && val <= 100
            }
        },
        showValue: Boolean,
        striped: Boolean,
        animated: Boolean,
    },
    computed: {
        sum: function () {
            return this.list && this.list.length > 0 
                    ? this.list.map( el => isNaN(el.value) ? 0 : Number(el.value) ).reduce((acc, cur) => acc + cur, 0)
                    : this.now
        }
    },
    mounted () {
       this.setSpanStyle()
    },
    methods: {
        setSpanStyle: function () {
             const nodes = this.$el.children[0].childNodes
            let offsetWidth = 0
            for (var i = 0; i < nodes.length - 1; i++) {
                offsetWidth += nodes[i].offsetWidth
            }
            this.spanStyle = offsetWidth == 0 ? {} : {
                left: offsetWidth / 2 - 6 + 'px'
            }
        }
    },
}
</script>