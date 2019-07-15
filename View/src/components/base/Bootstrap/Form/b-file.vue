<template>
    <div class="custom-file">
        <input type="file" class="custom-file-input" :id="id" v-bind="$attrs" v-on="$listeners" @change="fileChaged">
        <b-info v-if="validInfo || Object.keys($scopedSlots).includes('valid-info')" state="valid"><slot name="valid-info">{{ validInfo }}</slot></b-info>
        <b-info v-if="invalidInfo || Object.keys($scopedSlots).includes('invalid-info')" state="invalid"><slot name="invalid-info">{{ invalidInfo }}</slot></b-info>
        <label class="custom-file-label" :class="objClass" :for="id" data-browse="选择文件">{{ fillText }}</label>
    </div>
</template>
<script>
import util from '@/util/index.js'
import utilities from '@/components/utilities/index.js'

import BInfo from '@/components/base/Bootstrap/Form/Other/b-form-info.vue'

export default {
    name: 'b-file',
    inheritAttrs: false,
    mixins: [ utilities.mixins.form.base, utilities.mixins.form.validator ],
    components: { BInfo },
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
    },
    methods: {
        validator: function (e) {
            // 验证函数不会对传入的数据进行处理
            const value = e.target ? e.target.value.trim() : e.value.trim()
            // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
            if (!this.validateRequired(value)) { util.dom.addClass(e.target, 'is-invalid'); return }
            util.dom.removeClass(e.target, 'is-invalid')
            this.$emit('valid')
        },
        fileChaged: function (e) {
            this.fillText = ''
            for (const file of e.target.files) {
                this.fillText += `${file.name} (${this.returnFileSize(file.size)}),`
            }
            this.fillText = this.fillText.substring(0, this.fillText.length - 1)
            this.$emit('change:upload', e.target.files, this.fillText)
        },
        returnFileSize: function(number) {
            if(number < 1024) {
                return number + 'bytes';
            } else if(number > 1024 && number < 1048576) {
                return (number/1024).toFixed(1) + 'KB';
            } else if(number > 1048576) {
                return (number/1048576).toFixed(1) + 'MB';
            }
        },
        validFileType: function (file, type) {
            return type.includes 
                ? type.includes(file.type) 
                : file === type
        }
    },
}
</script>
