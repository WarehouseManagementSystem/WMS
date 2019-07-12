<template>
  <div class="h-100 d-block">
    <form class="needs-validation" novalidate>
      <div class="my-1">
        <b-dropdownpicker placeholder="年" ></b-dropdownpicker>
        <b-year-picker type="year" v-model="year"></b-year-picker>
        <b-year-picker type="month" v-model="month" min="1950-0" max="2019-12-21"></b-year-picker>
        <b-year-picker type="date" v-model="date" min="1950-1-31" max="2019-12-31"></b-year-picker>
        
        <b-hour></b-hour>
        <b-minutes></b-minutes>
        <b-second></b-second>
        <b-time max="15:00" v-model='time' disabled></b-time>
        {{ year }}<br />
        {{ month }}<br />
        {{ date }}<br />
        {{ time }}<br />
        {{ color }}<br />

        <b-color v-model="color"></b-color>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BDropdownpicker from '@/components/base/Bootstrap/DropDownPicker/b-dropdownpicker.vue'
import BYearPicker from '@/components/base/Bootstrap/DateTime/DatePicker/b-date-picker.vue'
import BTime from '@/components/base/Bootstrap/DateTime/Time/b-time.vue'
import BHour from '@/components/base/Bootstrap/DateTime/Time/TimeList/b-hour-list.vue'
import BMinutes from '@/components/base/Bootstrap/DateTime/Time/TimeList/b-minutes-list.vue'
import BSecond from '@/components/base/Bootstrap/DateTime/Time/TimeList/b-second-list.vue'
import BColor from '@/components/base/Bootstrap/FormConter/b-color1.vue'

export default {
  name: 'HomePage',
  components: {
    BDropdownpicker,
    BYearPicker,
    BTime,
    BHour,
    BMinutes,
    BSecond,
    BColor,
  },
  data () {
    return {
      year: 2000,
      color: { r: 50, g: 50, b: 50 },
      month: '2019-02',
      date: '2012-02',
      time: '10:11:21',
      time1: '30:50',
      time2: '30:50',
      time3: '01:03:05',
    }
  },
  computed: {
    
  },
  methods: {
  
  },
}

</script>


