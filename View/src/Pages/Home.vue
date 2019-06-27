<template>
  <div class="h-100 d-block">
    <form class="needs-validation" novalidate>
      <div class="my-1">
        <b-dropdownpicker placeholder="年" ></b-dropdownpicker>
        <b-year-picker type="year" v-model="year" min="2015" max="2020"></b-year-picker>
        <b-year-picker type="month" v-model="month" min="1950-0" max="2019-12"></b-year-picker>
        <b-year-picker type="date" v-model="date" min="1950-0" max="2019-12-31"></b-year-picker>
<<<<<<< HEAD
        <b-time type="hh:mm" v-model="time1"></b-time>
        <b-time type="mm:ss" v-model="time2"></b-time>
        <b-time type="hh:mm:ss" v-model="time3"></b-time>
        <b-hour></b-hour>
        <b-minutes></b-minutes>
        <b-second></b-second>
=======
        <!-- <b-month-picker v-model="month" min="1950-0" max="2018-12"></b-month-picker> -->
>>>>>>> e4c1047eb496b54c71402e0d1c183fa3738334f7
        {{ year }}<br />
        {{ month }}<br />
        {{ date }}<br />
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BDropdownpicker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import BYearPicker from '@/components/base/Bootstrap/DateTime/DatePicker/b-date-picker.vue'
<<<<<<< HEAD
import BTime from '@/components/base/Bootstrap/DateTime/Time/b-time.vue'
import BHour from '@/components/base/Bootstrap/DateTime/Time/TimeList/b-hour-list.vue'
import BMinutes from '@/components/base/Bootstrap/DateTime/Time/TimeList/b-minutes-list.vue'
import BSecond from '@/components/base/Bootstrap/DateTime/Time/TimeList/b-second-list.vue'
=======
// import BMonthPicker from '@/components/base/Bootstrap/DateTime/b-month-picker.vue'
>>>>>>> e4c1047eb496b54c71402e0d1c183fa3738334f7

export default {
  name: 'HomePage',
  components: {
    BDropdownpicker,
    BYearPicker,
<<<<<<< HEAD
    BTime,
    BHour,
    BMinutes,
    BSecond,
=======
    // BMonthPicker,
>>>>>>> e4c1047eb496b54c71402e0d1c183fa3738334f7
  },
  data () {
    return {
      year: 2000,
      month: '2019-02',
      date: '2012-02'
    }
  },
  computed: {
    
  },
  methods: {
  
  },
}

</script>


