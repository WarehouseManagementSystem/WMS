<template>
<div>
  <!-- <span>language:</span>
  <select v-model.lazy="$i18n.locale" @change="lamgChange" :class="form-control">
    <option v-for="lang in langs" :key="lang.code" :value="lang.code">{{ lang.name }}</option>
  </select> -->
      <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        language
      </div>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <font class="dropdown-item"  v-for="lang in langs" :class="{ active: locale === lang.code }" :key="lang.code" :value="lang.code" @click="lamgChange(lang.code)">{{ lang.name }}</font>
      </div>
    </div>
</template>

<script>
import config from "@/config/index";
import { loadLanguageAsync } from "@/lang/index";

export default {
  name: "lang-select",
  data() {
    // return { langs: ["zh", "en"] }
    return {
      locale: this.$i18n.locale,
      langs: config.lang.langsList, // 支持的语言列表
    }; 
  },
  mounted() {
    loadLanguageAsync(config.lang.fallbackLocale); // 加载备用语言包
    loadLanguageAsync(config.lang.defaultLocale); // 加载默认语言包
  },
  created() {
    this.locale = config.lang.defaultLocale // 加载默认语言
  },
  methods: {
    lamgChange: function(code) {
      this.locale = code
      loadLanguageAsync(this.locale); // 加载所选择的语言
    }
  }
};
</script>