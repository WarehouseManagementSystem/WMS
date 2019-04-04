<template>
  <div class="h-100 d-block">
   <Alert :position="'top-center'" :show="showAlert" :variant="'success'" :countDownDisdismis="true" @close="alertClose">
     <template #header>will down</template>
      avc
     <template #footer>footer</template>
   </Alert>
   <button @click="showAlert = !showAlert">click</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import ListView from '@/components/view/ListView/list-view.vue'
import Alert from '@/components/base/Bootstrap/BAlert/b-alert.vue'

export default {
  name: 'HomePage',
  components: {
    Alert
  },
  data () {
    return {
      showAlert: true,
    }
  },
  methods: {
      alertClose: function () {
        this.showAlert = false
      }
    }
}

</script>


