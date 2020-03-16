// filters
// 通用过滤器

export default {
    // 首字母大写
    firstUpperCase: value => !value ? '' : value.toString().toLowerCase().charAt(0).toUpperCase() + value.slice(1),
    // 单词首字母大写（三个字母以下的单词不转换）
    worldUpperCase: value => !value ? '' : value.toString().toLowerCase().replace(/( |^)[a-z](?=[a-z]{2,})/g, e => e.toUpperCase()),
    // 小写, 单词间添加连字符（默认：‘-’）
    upperToHyphenLower: (value, chart = '-') => !value ? '' : value.toString().replace(/[A-Z]/g, e => chart + e.toLowerCase()),
}