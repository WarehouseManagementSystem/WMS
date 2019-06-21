<template>
  <div class="h-100 d-block">
    <form class="needs-validation" novalidate>
      <div class="my-1">
        <b-dropdownpicker placeholder="年" ></b-dropdownpicker>
        <b-year-picker type="year" v-model="year" min="2015" max="2020"></b-year-picker>
        <b-year-picker type="month" v-model="month" min="1950-0" max="2018-12"></b-year-picker>
        <!-- <b-month-picker v-model="month" min="1950-0" max="2018-12"></b-month-picker> -->
        {{ year }}<br />
        {{ month }}<br />
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BDropdownpicker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import BYearPicker from '@/components/base/Bootstrap/DateTime/DatePicker/b-date-picker.vue'
// import BMonthPicker from '@/components/base/Bootstrap/DateTime/b-month-picker.vue'

export default {
  name: 'HomePage',
  components: {
    BDropdownpicker,
    BYearPicker,
    // BMonthPicker,
  },
  data () {
    return {
      year: 2000,
      month: '2019-02',
    }
  },
  computed: {
    
  },
  methods: {
  
  },
}

</script>


