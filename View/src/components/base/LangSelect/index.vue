<template>
<div>
  <!-- <span>language:</span>
  <select v-model.lazy="$i18n.locale" @change="lamgChange" :class="form-control">
    <option v-for="lang in langs" :key="lang.code" :value="lang.code">{{ lang.name }}</option>
  </select> -->
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        language
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#" v-for="lang in langs" :key="lang.code" :value="lang.code" v-on:click="lamgChange(lang.code)">{{ lang.name }}</a>
      </div>
    </div>
</template>

<script>
import config from "@/config/index";
import { loadLanguageAsync, i18n } from "@/lang/index";

export default {
  name: "locale-changer",
  data() {
    // return { langs: ["zh", "en"] }
    return {
      locale: i18n.locale,
      langs: config.lang.langsList, // 支持的语言列表
    }; 
  },
  beforeCreate() {
    loadLanguageAsync(config.lang.fallbackLocale); // 加载备用语言包
    loadLanguageAsync(config.lang.defaultLocale); // 加载默认语言包
  },
  created() {
    this.locale = config.lang.defaultLocale // 加载默认语言
  },
  methods: {
    lamgChange: function(code) {
      this.locale = code,
      loadLanguageAsync(this.locale); // 加载所选择的语言
    }
  }
};
</script>