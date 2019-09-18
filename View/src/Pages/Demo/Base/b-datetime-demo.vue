<template>
    <div class="Form">
        <h2>b-date-picker</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-date-picker class="col-11"></b-date-picker>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-date-picker class="col-11" disabled></b-date-picker>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-date-picker class="col-11" info="info text"></b-date-picker>
        </div>
        <div class="row">
            <font class="col-1">type:</font>
            <font class="col-1">year:</font>
            <b-date-picker class="col-2" type="year"></b-date-picker>
            <font class="col-1">month:</font>
            <b-date-picker class="col-2" type="month"></b-date-picker>
            <font class="col-1">date:</font>
            <b-date-picker class="col-2" type="date"></b-date-picker>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <font class="col-1">year:</font>
            <b-date-picker class="col-2" type="year" value="2018"></b-date-picker>
            <font class="col-1">month:</font>
            <b-date-picker class="col-2" type="month" value="2018"></b-date-picker>
            <font class="col-1">date:</font>
            <b-date-picker class="col-2" type="date" value="2018"></b-date-picker>
        </div>
        <div class="row">
            <font class="col-1">min<br />max:</font>
            <font class="col-1">year:</font>
            <b-date-picker class="col-2" type="year" min="2018" max="2019"></b-date-picker>
            <font class="col-1">month:</font>
            <b-date-picker class="col-2" type="month" min="2018" max="2019-09"></b-date-picker>
            <font class="col-1">date:</font>
            <b-date-picker class="col-2" type="date" min="2018" max="2019-09-30" info="info text"></b-date-picker>
        </div>
        <div class="row">
            <font class="col-1">v-model:</font>
            <font class="col-1">year<br />{{ year }}:</font>
            <b-date-picker class="col-2" type="year" v-model='year'></b-date-picker>
            <font class="col-1">month<br />{{ month }}:</font>
            <b-date-picker class="col-2" type="month" v-model='month'></b-date-picker>
            <font class="col-1">date<br />{{ date }}:</font>
            <b-date-picker class="col-2" type="date" v-model='date'></b-date-picker>
        </div>
        <h2>b-datetime</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-time class="col-11"></b-time>
        </div>
        <div class="row">
            <font class="col-1">disabled:</font>
            <b-time class="col-11" disabled></b-time>
        </div>
        <div class="row">
            <font class="col-1">readonly:</font>
            <b-time class="col-11" readonly></b-time>
        </div>
        <div class="row">
            <font class="col-1">info:</font>
            <b-time class="col-11" info="info text"></b-time>
        </div>
        <div class="row">
            <font class="col-1">type:</font>
            <font class="col-1">hh:mm:</font>
            <b-time class="col-4" type="hh:mm"></b-time>
            <font class="col-1">hh:mm:ss:</font>
            <b-time class="col-4" type="hh:mm:ss"></b-time>
        </div>
        <div class="row">
            <font class="col-1">value:</font>
            <font class="col-1">hh:mm:</font>
            <b-time class="col-4" type="hh:mm" value="05:32"></b-time>
            <font class="col-1">hh:mm:ss:</font>
            <b-time class="col-4" type="hh:mm:ss" value="05:32:13"></b-time>
        </div>
        <div class="row">
            <font class="col-1">min<br />max:</font>
            <font class="col-1">hh:mm:</font>
            <b-time class="col-4" type="hh:mm" min="09:00" max="15:59"></b-time>
            <font class="col-1">hh:mm:ss:</font>
            <b-time class="col-4" type="hh:mm:ss" min="09:00" max="15:59:59" info="info text"></b-time>
        </div>
        <div class="row">
            <font class="col-1">v-model:</font>
            <font class="col-1">hh:mm<br />{{ hhmm }}:</font>
            <b-time class="col-4" type="hh:mm" v-model="hhmm"></b-time>
            <font class="col-1">hh:mm:ss<br />{{ hhmmss }}:</font>
            <b-time class="col-4" type="hh:mm:ss" v-model="hhmmss"></b-time>
        </div>
        <h2>b-year-picker</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-year-picker class="col-3"></b-year-picker>
            <font class="col-1">disabled:</font>
            <b-year-picker class="col-3" disabled></b-year-picker>
            <font class="col-1">value:</font>
            <b-year-picker class="col-3" value="2012"></b-year-picker>
        </div>
        <div class="row">
            <font class="col-1">min<br />max:</font>
            <b-year-picker class="col-5" min="2000" max="2020"></b-year-picker>
            <font class="col-1">v-model<br />{{ year1 }}:</font>
            <b-year-picker class="col-5" v-model="year1"></b-year-picker>
        </div>

        <h2>b-month-picker</h2>
        <hr>
        <div class="row">
            <font class="col-1">default:</font>
            <b-month-picker class="col-3"></b-month-picker>
            <font class="col-1">disabled:</font>
            <b-month-picker class="col-3" disabled></b-month-picker>
            <font class="col-1">value:</font>
            <b-month-picker class="col-3" value="2012"></b-month-picker>
        </div>
        <div class="row">
            <font class="col-1">min<br />max:</font>
            <b-month-picker class="col-5" min="5" max="7"></b-month-picker>
            <font class="col-1">v-model<br />{{ month1 }}:</font>
            <b-month-picker class="col-5" v-model="month1"></b-month-picker>
        </div>
    </div>
</template>

<script>
import BDatePicker from '@/components/base/Bootstrap/DateTime/Date/DatePicker/b-date-picker.vue'
import BTime from '@/components/base/Bootstrap/DateTime/Time/b-time.vue'

import BYearPicker from '@/components/base/Bootstrap/DateTime/Date/DateList/b-year-picker.vue'
import BMonthPicker from '@/components/base/Bootstrap/DateTime/Date/DateList/b-month-picker.vue'

export default {
    name: 'b-datetime-demo',
    components: { BDatePicker, BTime, BYearPicker, BMonthPicker, },
    data () {
        return {
            year: '2018',
            month: '2018-05',
            date: '2018-05-03',
            hhmm: '06:31',
            hhmmss: '06:31:59',
            year1: '2015',
            month1: '3',
        }
    }
}
</script>
