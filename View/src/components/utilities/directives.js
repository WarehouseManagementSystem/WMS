import Vue from 'vue'
import jQuery from 'jquery'
import util from '@/util/index.js'
// directives
// 通用指令

// 注册一个全局自定义指令 `v-focus`
Vue.directive('tip', {
    bind: function (el, binding) {

        var arg = binding.arg || 'tooltip'
        if (!['tooltip', 'popover'].includes(arg)) return
        if (!binding.value) return
        
        jQuery(function () {
            jQuery('[data-toggle="tooltip"]').tooltip({ container: '#main-content' })
            jQuery('[data-toggle="popover"]').popover({ container: '#main-content' })
        })
        
        if (arg == 'tooltip') { 
            util.dom.addAttrs(el, {
                'data-toggle': arg,
                'data-placement': binding.value.placement || 'top',
                title: binding.value.content || binding.value,
            })
        } else {
            util.dom.addAttrs(el, {
                'data-toggle': arg,
                'data-placement': binding.value.placement || 'top',
                'data-content': binding.value.content || binding.value,
                title: binding.value.title || '',
            })
            if (binding.value.trigger) util.dom.addAttr(el, 'data-trigger', binding.value.trigger)
        }
    },
})

export default {}
