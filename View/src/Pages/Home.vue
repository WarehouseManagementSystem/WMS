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
        <b-text type="email" required ></b-text>
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
        <b-checkbox-tree :list="list" v-model="value3" ></b-checkbox-tree>
        <b-select :list="list1" v-model="selected" required></b-select>
        <b-dropdownlist trigger="a" :list="list1" v-model="selected"></b-dropdownlist>
        <b-number v-model="valuen" ></b-number>
        <b-year v-model="year"></b-year>
        {{ value1 }}<br />
        {{ value2 }}<br />
        {{ value3 }}<br />
        {{ selected }}<br />
        {{ valuen }}<br />
        {{ year }}<br />
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
import BSelect from '@/components/base/Bootstrap/FormConter/b-select.vue'
import BDropdownlist from '@/components/base/Bootstrap/FormConter/b-dropdownlist.vue'
import BNumber from '@/components/base/Bootstrap/FormConter/b-number.vue'

import BYear from '@/components/base/Bootstrap/FormConter/b-year-list.vue'

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
    BSelect,
    BDropdownlist,
    BNumber,

    BYear,
  },
  data () {
    return {
      value1: true,
      value2: ['1-b',],
      value3: ['A','A-1-1-1', 'B-1-1', 'C-1', 'D'],
      selected: 'v-1-a',
      valuen: 10,
      message: '',
      year: 2018,
      list: [
        { value: 'A', text: 'A', 
          children: [
            { value: 'A-1', text: 'A-1',
              children: [
                { value: 'A-1-1', text: 'A-1-1', 
                  children: [
                    { value: 'A-1-1-1', text: 'A-1-1-1', },
                    { value: 'A-1-1-2', text: 'A-1-1-2', },
                    { value: 'A-1-1-3', text: 'A-1-1-3', },
                    { value: 'A-1-1-4', text: 'A-1-1-4', },
                  ]},
                { value: 'A-1-2', text: 'A-1-2', },
                { value: 'A-1-3', text: 'A-1-3', },
                { value: 'A-1-4', text: 'A-1-4', },
            ]},
            { value: 'A-2', text: 'A-2', 
              children: [
                { value: 'A-2-1', text: 'A-2-1', },
                { value: 'A-2-2', text: 'A-2-2', },
                { value: 'A-2-3', text: 'A-2-3', },
                { value: 'A-2-4', text: 'A-2-4', },
              ]},
            { value: 'A-3', text: 'A-3', },
            { value: 'A-4', text: 'A-4', },
          ]},
        { va4ue: 'B', text: 'B', 
          children: [
            { value: 'B-1', text: 'B-1', 
              children: [
                { value: 'B-1-1', text: 'B-1-1', },
                { value: 'B-1-2', text: 'B-1-2', },
                { value: 'B-1-3', text: 'B-1-3', },
                { value: 'B-1-4', text: 'B-1-4', },
              ]},
            { value: 'B-2', text: 'B-2', },
            { value: 'B-3', text: 'B-3', },
            { value: 'B-4', text: 'B-4', },
          ]},
        { va4ue: 'C', text: 'C', 
          children: [
            { value: 'C-1', text: 'C-1', },
            { value: 'C-2', text: 'C-2', },
            { value: 'C-3', text: 'C-3', },
            { value: 'C-4', text: 'C-4', },
          ]},
        { value: 'D', text: 'D', },
      ],
      list1: [
        { value: 'v-1-a', text: '1-a', },
        { value: 'v-1-b', text: '1-b', },
        { value: 'v-1-c', text: '1-c', },
        { value: 'v-1-d', text: '1-d', disabled: true},
      ],
    }
  },
  computed: {
    
  },
  methods: {
  
  },
}

</script>


