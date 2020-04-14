<template>
  <div class="custom-file">
    <input type="file" class="custom-file-input" :id="id" v-bind="$attrs" v-on="$listeners" @change="fileChaged">
    <b-valid v-if="validInfo || $slots.valid" state="valid"><slot name="valid">{{ validInfo }}</slot></b-valid>
    <b-valid v-if="invalidInfo || $slots.invalid" state="invalid"><slot name="invalid">{{ invalidInfo }}</slot></b-valid>
    <label class="custom-file-label d-flex align-items-center" :for="id" data-browse="选择文件">
      <slot>{{ fillText }}</slot>
    </label>
  </div>
</template>

<script>
// https://www.npmjs.com/package/bs-custom-file-input

import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BValid from '@/components/base/Bootstrap/Form/Other/b-form-valid.vue'

export default {
  name: 'b-file',
  inheritAttrs: false,
  mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
  components: { BValid },
  data () {
    return {
      fillText: 'Choose file...',
    }
  },
  props: {
    id: {
      type: String,
      default: function () {
        return 'File-' + util.random.getRandomString()
      }
    },
    types: {
      type: Array,
      default: () => [],
      require: true,
      validator: (val) => val.length > 0
    }
  },
  methods: {
    validator: function (e) {
      // 验证函数不会对传入的数据进行处理
      const value = e.target ? e.target.value.trim() : e.value.trim()
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
     // 文件类型验证
      if (!this.validFileType(e.target.files, this.types)) { util.dom.addClass(e.target, 'is-invalid'); return }
      util.dom.removeClass(e.target, 'is-invalid')
      // 当存在 valid slot 或 validInfo 时
      if (this.$slots.valid || this.validInfo) util.dom.addClass(e.target, 'is-valid')
      this.$emit('valid')
    },
    fileChaged: function (e) {
      this.validator(e) // 验证数据合法性
      // this.fillText = ''
      // for (const file of e.target.files) {
      //     this.fillText += `${file.name} (${this.formatFileSize(file.size)}),`
      // }
      // this.fillText = this.fillText.substring(0, this.fillText.length - 1)
      this.$emit('change:upload', e.target.files)
    },
    formatFileSize: function(fileSize) {
      let size = [ 'bytes', 'KB', 'MB', 'GB', 'TB' ]
      let e = size.find((e, index) => fileSize < Math.pow(1024, index + 1))
      return e
        ? (fileSize / Math.pow(1024, size.indexOf(e))).toFixed(1) + e
        : (fileSize / Math.pow(1024, size.length - 1)).toFixed(1) + size[size.length - 1]
    },
    validFileType: function (files, types) {
      return Array.of(files).every(e => types.includs && types.includs(e.type))
    },
  },
}
</script>
