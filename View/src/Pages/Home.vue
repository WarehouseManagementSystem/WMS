<template>
  <div class="h-100 d-block">
    <drop>
      <template #trigger>
          Action
      </template>
      <template #menu>
        <drop-item text="button" />
        <drop-item text="button" />
        <drop-item text="button" />
        <drop-item text="button" />
        <drop-text text="text" />
        <drop-header text="header" />
        <drop-line />
      </template>
    </drop>
  </div>
</template>

<script>
// @ is an alias to /src
import drop from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'
import dropItem from '@/components/base/Bootstrap/Dropdown/b-dropdown-item.vue'
import dropText from '@/components/base/Bootstrap/Dropdown/b-dropdown-item-text.vue'
import dropHeader from '@/components/base/Bootstrap/Dropdown/b-dropdown-header.vue'
import dropLine from '@/components/base/Bootstrap/Dropdown/b-dropdown-divider.vue'

export default {
  name: 'HomePage',
  components: {
    drop,
    dropItem,
    dropText,
    dropHeader,
    dropLine,
  },
  data () {
    return {
      items: [
        
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


