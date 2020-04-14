<template>
 <div>
    <h2>b-file</h2>
    <hr>
    <div class="row no-gutters py-1">
      <font class="col-1">default:</font>
      <b-file class="col-11" />
    </div>
    <div class="row no-gutters py-1">
      <font class="col-1">multiple:</font>
      <b-file class="col-11" multiple />
    </div>
    <div class="row no-gutters py-1">
      <font class="col-1">slot:</font>
      <b-file class="col-11">
        <button class="btn btn-primary p-1">select files...</button>
      </b-file>
    </div>
 </div>
</template>

<script>
import BFile from '@/components/base/Bootstrap/Form/b-file.vue'

export default {
  name: 'b-file-demo',
  components: {
    BFile,
  },
}
</script>
