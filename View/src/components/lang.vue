<template>
  <div class="locale-changer">
    <select v-model.lazy="$i18n.locale" @change="lamgChange">
      <option v-for="lang in langs" :key="lang.code" :value="lang.code">{{ lang.name }}</option>
    </select>
  </div>
</template>

<script>
import {defaultLocal, loadLocalConfig, loadLanguageAsync,i18n} from '@/lang/index'
import langs from '@/lang/langs.js'

export default {
  name: "locale-changer",
  data() {
    // return { langs: ["zh", "en"] };
    return {langs: langs,}
  },
  beforeCreate () {
    loadLocalConfig(defaultLocal)
  },
  methods: {
    lamgChange: function () {
      loadLanguageAsync(i18n.locale);
    }
  },
};
</script>