<template>
    <file-pond
      ref="pond"
      v-bind="$attrs"
      v-on="$listeners"
      name="file uploader"
      :allow-multiple="multiple"
      v-on:init="handleFilePondInit" />
</template>

<script>
/**
 * filepond
 * https://pqina.nl/filepond
 * filepond docs
 * https://pqina.nl/filepond/docs/
 */
// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
  name: 'b-file',
  inheritAttrs: false,
  props: {
    info: String,
    multiple: Boolean,
  },
  created() {

  },
  destroy() {
    FilePond.destroy()
  },
  methods: {
    handleFilePondInit: function() {
      console.log('FilePond has initialized');
      // example of instance method call on pond reference
      this.$refs.pond.getFiles();
    }
  },
}

</script>
