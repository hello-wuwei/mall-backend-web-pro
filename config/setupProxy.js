module.exports = {
  '/api': {
    changeOrigin: true,
    // target: 'http://10.255.50.48:20081',  // 开发环境
    target: 'http://10.160.1.174:8080',  // 高钦本地环境
    // secure: false,
    pathRewrite: { '^/api' : '' }
  }
}