<template>
    <div  class="form-group">
        <sr-message :for="guid">{{ SrMessage }}</sr-message>
        <label :for="guid">{{ label }}</label>
        <input 
            type="text" 
            :id="guid" 
            v-bind="$attrs" 
            v-on="$listeners"
            class="form-control is-valid" 
            :list="'datalist-' + guid" 
            :aria-describedby="'HelpBlock-' + guid" required/>
        <b-datalist v-if="datalist && datalist.length> 0" :id="'datalist-' + guid" :datalist="datalist"></b-datalist>
        <B-help :id="'HelpBlock-' + guid" :message="message"></B-help>
        <b-info state="success"><slot name="success"></slot>{{ success }}</b-info>
        <b-info state="error"><slot name="error"></slot>{{ error }}</b-info>
  </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'
import SrMessage from '@/components/base/Bootstrap/SrOney/b-sr-only.vue'
import BHelp from './b-help-block'
import BInfo from './b-valid-info'
import BDatalist from './b-datalist'

export default {
    name: 'b-text',
    inheritAttrs: false,
    components: {
        BHelp,
        BInfo,
        SrMessage,
        BDatalist,
    },
    props: {
        SrMessage: utilities.props.SrMessage,
        label: utilities.props.label,
        datalist: utilities.props.list,
        message: utilities.props.message,
        success: utilities.props.success,
        error: utilities.props.error,
    },
    computed: {
        guid: function () {
            return 'imput-text-'+ util.random.getRandomString()
        },
    }
}
</script>
