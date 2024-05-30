const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'page title' // page title

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '~api': '@/api',
        '~views': '@/views',
        '~icons': '@/icons',
        '~components': '@/components'
      }
    },
      // plugins: [
      //   new HtmlWebpackPlugin({
      //     filename: 'index.html',
      //     template: 'public/index.html'
      //   })
      // ]
  },

})
