<template>
    <div>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label 
                v-for="(item, index) in list" 
                :key="index" class="btn" 
                v-bind="$attrs" 
                :class="[`btn-${item.color || color}`, { active: item.value == value, disabled: disabled || item.disabled }]" >
                <input 
                    type="radio" 
                    :name="name" 
                    :id="item.id" 
                    autocomplete="off" 
                    :value="item.value" 
                    :checked="item.value == value" 
                    :aria-checked="item.value == value"
                    :disabled="disabled || item.disabled"
                    :aria-diasbled="disabled || item.disabled"
                     />
                {{item.label}}
            </label>
        </div>
        <b-help :info="info" />
    </div>
</template>

<script>
import utilities from '@/components/utilities/index.js'

import BHelp from '@/components/base/Bootstrap/Form/Other/b-form-help.vue'

export default {
    name: 'b-radio-button-group',
    inheritAttrs: false,
    components: { BHelp, },
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        value: utilities.props.text,
        list: utilities.props.list,
        info: utilities.props.text,
        disabled: utilities.props.disabled,
        color: utilities.props.color,
        name: {
            type: String,
            required: true,
        },
    },
}
</script>
