<template>
  <b-dropdown v-if="langs.length > 0" trigger="language" :list="langs" :select="select" @menuClick="lamgChange" />
</template>

<script>
import config from "@/config/index";
import { loadLanguageAsync } from "@/lang/index";
import BDropdown from '@/components/base/Bootstrap/Dropdown/b-dropdown.vue'

export default {
  name: "lang-select",
  components: { BDropdown },
  data() {
    // return { langs: ["zh", "en"] }
    return {
      locale: this.$i18n.locale,
      langs: config.lang.langsList.map(e => ({value: e.name, code: e.code})), // 支持的语言列表
    }; 
  },
  computed: {
    select: function () {
      return this.langs.find && this.langs.find(e => e.code == this.locale).value
    },
  },
  mounted() {
    loadLanguageAsync(config.lang.fallbackLocale); // 加载备用语言包
    loadLanguageAsync(config.lang.defaultLocale); // 加载默认语言包
  },
  created() {
    this.locale = config.lang.defaultLocale // 加载默认语言
  },
  methods: {
    lamgChange: function(item) {
      this.locale = item.code
      loadLanguageAsync(this.locale); // 加载所选择的语言
    },
  }
}
</script>