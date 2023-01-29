const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',


  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],

  devServer: {
    port: 8081,
  }
})
// export devWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})