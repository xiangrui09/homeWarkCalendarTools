const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const defaultSettings = require('./src/settings.js')

// 路径解析函数
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 加载环境配置
const environment = process.env.NODE_ENV || 'development'
const envConfig = require(`./config/${environment}.js`)

// 从设置中获取页面标题
const name = envConfig.publicName || defaultSettings.title // 页面标题

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: envConfig.publicPath,
  configureWebpack: {
    // 在 webpack 的 name 字段中提供应用的标题，
    // 以便在 index.html 中注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '~api': '@/api',
        '~views': '@/views',
        '~icons': '@/icons',
        '~components': '@/components'
      }
    }
  },
  chainWebpack(config) {
    // 修改默认的 htmlWebpackPlugin 插件配置
    config.plugin('html').tap(args => {
      args[0].title = name;
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        // 全局引入comm.scss
        additionalData: `@import "@/styles/comm.scss";`
      }
    }
  }
})
