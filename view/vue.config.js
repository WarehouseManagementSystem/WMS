module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    extract: false, // 解决 build 时 不加载样式的问题
    requireModuleExtension: true,
    
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
}
