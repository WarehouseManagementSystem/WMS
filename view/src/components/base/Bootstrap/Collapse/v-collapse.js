import Vue from 'vue'
import util from '@/util/index.js'

Vue.directive('coll', {
    inserted: function (el, binding) {
        let target = binding.value

        if (!target) return
        util.dom.addAttrs(el, {
            'data-toggle': 'collapse',
            'aria-controls': binding.arg || 'Collapse Controller',
            'aria-expanded': binding.modifiers.show || false,
        })
        
        el.tagName.toLowerCase() == 'a' 
            ? util.dom.addAttr(el, 'href', target)
            : util.dom.addAttr(el, 'data-target', target)
    }
})