module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8070',
        ws: true,
        changeOrigin: true,
      }
    }
  }
}
