const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',

}


const config = {
  externals: {
    paths: PATHS
  },
  entry: PATHS.src,
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|ttf|svg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|svg)$/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pug/pages', 'index.pug'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pug/ui-kit', 'colors.pug'),
      filename: 'colors.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pug/ui-kit', 'form-elements.pug'),
      filename: 'form-elements.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pug/ui-kit', 'headers-footers.pug'),
      filename: 'headers-footers.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],

};

module.exports = config;