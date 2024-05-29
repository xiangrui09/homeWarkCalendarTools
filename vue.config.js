// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/',
  // configureWebpack: {
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       filename: 'index.html',
  //       template: 'public/index.html'
  //     })
  //   ]
  // }

})
