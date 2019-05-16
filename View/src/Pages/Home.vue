<template>
  <div class="h-100 d-block">
    <form class="needs-validation" novalidate>
      <div class="my-1">
        <b-text type="text" minlength="5">
          <template #invalid-info>
            error
          </template>
          <template #valid-info>
            success
          </template>
        </b-text>
        <b-text type="search"></b-text>
        <b-text type="password"></b-text>
        <b-text type="email" required></b-text>
        <b-text type="tel"></b-text>
        <b-text type="phone"></b-text>
        <b-text type="url" required></b-text>
        <b-textarea invalid-info="success"></b-textarea>
        <b-radio name="a" value="a1" true-value="yes" false-value="no" required inline></b-radio>
        <b-radio name="a" value="a2" true-value="yes" false-value="no" required inline></b-radio>
        <b-switch></b-switch>
        <b-range></b-range>
        <b-checkbox text="c"></b-checkbox>
        <b-file multiple></b-file>
        <b-image width="100" height="30" src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png"></b-image>
        <b-hidden></b-hidden>
        {{ value }}
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BText from '@/components/base/Bootstrap/FormConter/b-text.vue'
import BTextarea from '@/components/base/Bootstrap/FormConter/b-textarea.vue'
import BRadio from '@/components/base/Bootstrap/FormConter/b-radio.vue'
import BSwitch from '@/components/base/Bootstrap/FormConter/b-switch.vue'
import BRange from '@/components/base/Bootstrap/FormConter/b-range.vue'
import BCheckbox from '@/components/base/Bootstrap/FormConter/b-checkbox.vue'
import BFile from '@/components/base/Bootstrap/FormConter/b-file.vue'
import BImage from '@/components/base/Bootstrap/FormConter/b-image.vue'
import BHidden from '@/components/base/Bootstrap/FormConter/b-hidden.vue'

export default {
  name: 'HomePage',
  components: {
    BText,
    BTextarea,
    BRadio,
    BSwitch,
    BRange,
    BCheckbox,
    BFile,
    BImage,
    BHidden,
  },
  data () {
    return {
      value: 'a',
      message: '',
    }
  },
  computed: {
    
  },
  methods: {
  
  },
  watch: {
    
  }
}

</script>


