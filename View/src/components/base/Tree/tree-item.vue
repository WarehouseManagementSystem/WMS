<template>

<!-- item template -->
  <li>
    <div
      @click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul  v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="(item, index) in model.children"
        :key="index"
        :model="item" />
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'tree-item',
  components: {
      item: () => import('./item.vue'),
  },
  props: {
      model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
      this.model.children.length > 0
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
          this.$set(this.model, 'children', [])
          this.addChild()
          this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
          name: 'new stuff'
      })
    },
  }
}

</script>

