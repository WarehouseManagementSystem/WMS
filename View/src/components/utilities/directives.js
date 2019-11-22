import Vue from 'vue'
import jQuery from 'jquery'

import util from '@/util/index.js'
// directives
// 通用指令

// 注册一个全局自定义指令 `v-tip`(用于提示弹窗)
Vue.directive('tip', (el, binding) => {

    let arg = binding.arg || 'tooltip'
    if (!['tooltip', 'popover'].includes(arg)) return
    if (!binding.value) return
    
    let modifiers = 'top'
    if (binding.modifiers) { 
        modifiers = binding.modifiers.top ? 'top'
            : binding.modifiers.bottom ? 'bottom'
                : binding.modifiers.left ? 'left'
                    : binding.modifiers.right ? 'right' : 'top'
    }

    if (arg == 'tooltip') { 
        jQuery(el).tooltip({
            toggle: arg,
            placement: modifiers,
            title: binding.value.content || binding.value,
            container: binding.value.container || 'body'
        })
    } else {
        let obj = {
            toggle: arg,
            placement: modifiers,
            content: binding.value.content || binding.value,
            title: binding.value.title || '',
            container: binding.value.container || 'body',
        }
        if (binding.value.trigger) obj.trigger = binding.value.trigger
        jQuery(el).popover(obj)
    }
}) // tip

// 注册一个全局自定义指令 `v-modal`(用于模态弹窗， 与 v-model 不同)
Vue.directive('modal', (el, binding) => { 
    util.dom.addAttrs(el, {
        'data-toggle': 'modal',
        'data-target': binding.value
    })
}) // modal

export default {}
