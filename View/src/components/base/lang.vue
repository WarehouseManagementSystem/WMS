<template>
  <div class="locale-changer form-control">
    <span>language: </span>
    <select v-model.lazy="$i18n.locale" @change="lamgChange">
      <option v-for="lang in langs" :key="lang.code" :value="lang.code">{{ lang.name }}</option>
    </select>
  </div>
</template>

<script>

import config from '@/config/index'
import langs from '@/config/lang/langList'
import {loadLanguageAsync, i18n} from '@/config/lang/index'

export default {
  name: "locale-changer",
  data() {
    // return { langs: ["zh", "en"] };
    return {langs: langs,} // 支持的语言列表
  },
  beforeCreate () {
    loadLanguageAsync(config.lang.fallbackLocale) // 加载备用语言包
    loadLanguageAsync(config.lang.defaultlocale) // 加载默认语言包
  },
  created () {
    loadLanguageAsync(i18n.locale); // 加载默认语言
  },
  methods: {
    lamgChange: function () {
      loadLanguageAsync(i18n.locale); // 加载所选择的语言
    }
  },
};
</script>