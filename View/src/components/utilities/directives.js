import Vue from 'vue'
import jQuery from 'jquery'
// directives
// 通用指令

// 注册一个全局自定义指令 `v-focus`
Vue.directive('tip', function (el, binding) {

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
            'toggle': arg,
            'placement': modifiers,
            title: binding.value.content || binding.value,
            container: binding.value.container || 'body'
        })
    } else {
        binding.value.trigger
            ? jQuery(el).popover({
                'toggle': arg,
                'placement': modifiers,
                'content': binding.value.content || binding.value,
                title: binding.value.title || '',
                container: binding.value.container || 'body',
                trigger: binding.value.trigger
            })
            : jQuery(el).popover({
                'toggle': arg,
                'placement': modifiers,
                'content': binding.value.content || binding.value,
                title: binding.value.title || '',
                container: binding.value.container || 'body',
            })
    }
})

export default {}
