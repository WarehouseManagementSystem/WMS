<template>
 <div>
    <h2>b-file</h2>
    <base-a href="https://pqina.nl/filepond/docs/patterns/api/filepond-instance/">filepond-instance</base-a>
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
      <font class="col-1">disabled:</font>
      <b-file class="col-11" disabled="true" />
    </div>
 </div>
</template>

<script>
import BFile from '@/components/base/Bootstrap/Form/b-file.vue'
import BaseA from '@/components/base/Content/A/c-a.vue'

export default {
  name: 'b-file-demo',
  components: {
    BFile,
    BaseA,
  },
}
</script>
