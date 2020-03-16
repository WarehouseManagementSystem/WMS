module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/WMS/' : '/',
  css: {
    requireModuleExtension: true
  }
}