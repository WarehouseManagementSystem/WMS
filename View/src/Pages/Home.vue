<template>
  <div class="h-100 d-block">
    <bt>
    <bg :size="'sm'" :vertical="true" :role="'toolbar'" :aria-label="'buttons'">
      <bd :type="'submit'" :active="true" :variant="'dark'" @submit="click('submit')"></bd>
      <bd :type="'button'" @click="click('reset')"></bd>
    </bg>
     <bg :size="'lg'">
      <bd :type="'submit'" :active="true" :variant="'dark'" @submit="click('submit')"></bd>
      <bd :type="'button'" @click="click('reset')"></bd>
    </bg>
    </bt>
  </div>
</template>

<script>
// @ is an alias to /src
import bd from '@/components/base/Bootstrap/Button/b-button.vue'
import bg from '@/components/base/Bootstrap/ButtonGroup/b-button-group.vue'
import bt from '@/components/base/Bootstrap/ButtonGroup/b-btn-toolbar.vue'
export default {
  name: 'HomePage',
  components: {
    bd,
    bg,
    bt,
  },
  data () {
    return {
      content: [
        {path: 'a', name: 'a'},
        {path: 'b', name: 'b', isActive: true}
      ],
    }
  },
  methods: {
      click: function (str) {
        alert(str)
      }
  }
}

</script>


