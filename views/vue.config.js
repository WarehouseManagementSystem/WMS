module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: 'http://localhost:8080'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/WMS/'
    : '/'
}
