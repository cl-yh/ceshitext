'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //     "/api":{
    //         target:"http://122.152.225.176:801",
    //         changeOrigin: true,  //是否跨域
    //         secure:false,
    //         pathRewrite:{
    //             "^/api":""    //这里可以理解成代替target里面的地址
    //         },
        
    //     }
    // }, 
    proxyTable:{
        '/api': {
            target: 'http://122.152.225.176:801',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
              '/rest': '' // 重写公共路径
            }
          },
    },
    //代理接口（跨域）

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

   
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true   //检查css错误提示错误地址
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,  //生产环境中是否可查看源码
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',   //检查js错误提示错误地址

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,  //是否开启压缩
    productionGzipExtensions: ['js', 'css'], //需要使用压缩包的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
