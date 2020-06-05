<template>
  <div></div>
</template>

<script>
import {fs, path} from 'filer'

export default {
  name: 'b-file-browser',
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(fs)
      fs.stat(path.dirname('/'), (error, stat) => {
        if (stat.isDirectory()) {
          fs.readdir('/', (error, files) => {
            console.log(files)
            debugger
          })
        }
      })
    },
  },
}
</script>
