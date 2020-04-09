import Vue from 'vue'
import jQuery from 'jquery'

import util from '@/util/index.js'
// directives
// 通用指令

// v-tip
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

// v-modal
// 注册一个全局自定义指令 `v-modal`(用于模态弹窗， 与 v-model 不同)
Vue.directive('modal', (el, binding) => {
    util.dom.addAttrs(el, {
        'data-toggle': 'modal',
        'data-target': binding.value
    })
}) // modal

// v-lazy
// 延迟调用 在元素进入/快进入可是范围时执行回调函数
// 常用于图片等数据的延迟加载
Vue.directive('lazy', (el, binding) => {
  debugger
  let cellback = binding.value.cellback || binding.value
  let option = Object.assign({ root: null, rootMargin: '50px', threshold: 0, }, binding.value.option || {})
  let initObserver = new IntersectionObserver(changes => {
    changes.forEach(element => {
      // 当这个值大于 0，说明满足我们的加载条件了，这个值可通过 rootMargin 手动设置
      if (element.intersectionRatio > 0) {
        // 放弃监听，防止性能浪费，并加载图片。
        initObserver.unobserve(element.target)
        cellback && cellback()
      }
    })
  }, option)
  initObserver.observe(el)
}) // v-lazy

export default {}
