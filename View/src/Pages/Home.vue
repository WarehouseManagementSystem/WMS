<template>
  <div class="h-100 d-block">
    <form class="needs-validation" novalidate>
      <div class="my-1">
        <b-text type="text" minlength="5" readonly invalid-info="e">
          <template #invalid-info>
            error
          </template>
          <template #valid-info>
            success
          </template>
        </b-text>
        <b-text type="search" size="lg"></b-text>
        <b-text type="password"></b-text>
        <b-text type="email" required></b-text>
        <b-text type="tel"></b-text>
        <b-text type="phone"></b-text>
        <b-text type="url" required></b-text>
        <b-textarea invalid-info="success" readonly></b-textarea>
        <b-radio name="a" value="a1" true-value="yes" false-value="no" required inline></b-radio>
        <b-radio name="a" value="a2" true-value="yes" false-value="no" required inline></b-radio>
        <b-switch></b-switch>
        <b-range></b-range>
        <b-checkbox text="c" v-model="value1"></b-checkbox>
        <b-file multiple></b-file>
        <b-image width="100" height="30" disabled src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png"></b-image>
        <b-hidden></b-hidden>
        <b-redio-group :list="list1" name="abc" inline></b-redio-group>
        <b-checkbox-group :list="list1" v-model="value2" name="abcd"></b-checkbox-group>
        <b-checkbox-tree :list="list" v-model="value3"></b-checkbox-tree>
        {{ value1 }}<br />
        {{ value2 }}<br />
        {{ value3 }}<br />
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
import BRedioGroup from '@/components/base/Bootstrap/FormConter/b-radio-group.vue'
import BCheckboxGroup from '@/components/base/Bootstrap/FormConter/b-checkbox-group.vue'
import BCheckboxTree from '@/components/base/Bootstrap/FormConter/b-checkbox-tree.vue'

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
    BRedioGroup,
    BCheckboxGroup,
    BCheckboxTree,
  },
  data () {
    return {
      value1: true,
      value2: ['1-b',],
      value3: ['1-b', '2-a', '2-b', '2-c', '2-d', '1-c', '4-c'],
      message: '',
      list: [
        { text: '1-a', value: '1-a', 
          children: [
            { text: '2-a', value: '2-a', },
            { text: '2-b', value: '2-b', },
            { text: '2-c', value: '2-c', },
            { text: '2-d', value: '2-d', },
          ],},
        { text: '1-b', value: '1-b', 
          children: [
            { text: '3-a', value: '3-a', },
            { text: '3-b', value: '3-b', 
            children: [
              { text: '3-1-a', value: '3-1-a', },
              { text: '3-1-b', value: '3-1-b', },
              { text: '3-1-c', value: '3-1-c', },
              { text: '3-1-d', value: '3-1-d', },
          ]},
            { text: '3-c', value: '3-c', },
            { text: '3-d', value: '3-d', },
          ]},
        { text: '1-c', value: '1-c', },
        { text: '1-d', value: '1-d', children: [
            { text: '4-a', value: '4-a', },
            { text: '4-b', value: '4-b', },
            { text: '4-c', value: '4-c', },
            { text: '4-d', value: '4-d', },
          ]},
      ],
      list1: [
        { text: '1-a', value: '1-a' },
        { text: '1-b', value: '1-b' },
        { text: '1-c', value: '1-c' },
        { text: '1-d', value: '1-d' },
      ],
    }
  },
  computed: {
    
  },
  methods: {
  
  },
  watch: {
    value: function (val) {
      
      console.log(val)
    }
  }
}

</script>


