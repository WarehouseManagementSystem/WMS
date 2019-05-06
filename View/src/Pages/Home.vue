<template>
  <div class="h-100 d-block">
    <form class="was-validated" novalidate>
      <div class="my-1">
        <b-text id="text1" type="color" :aria-describedby="'HelpBlock-text1'" min="2" max="100" required></b-text>
        <b-info state="success"><slot name="success"></slot>success</b-info>
        <b-info state="error"><slot name="error"></slot>error</b-info>
        <B-help :id="'HelpBlock-text1'" message="hello"></B-help>
      </div>
      <div class="col-auto my-1">
        <b-text></b-text>
      </div>
      <div class="col-auto my-1">
        <b-text></b-text>
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import BText from '@/components/base/Bootstrap/FormConter/b-text.vue'
import BHelp from '@/components/base/Bootstrap/FormConter/b-form-help'
import BInfo from '@/components/base/Bootstrap/FormConter/b-form-info'

export default {
  name: 'HomePage',
  components: {
    BText,
    BHelp,
    BInfo,
  },
  data () {
    return {
    }
  },
  methods: {
  }
}

</script>


