const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // separates vendor bundles from main
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      // set vars needed by phaser
      'typeof SHADER_REQUIRE': JSON.stringify(false),
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      proxy: 'http://localhost:8080/',
      open: false
    })
  ],
  module: {
    rules: [
      { // traspile javascript using babel
        test: /\.js$/,
        exclude: [path.resolve(__dirname, './node_modules/')],
        use: {
          loader: 'babel-loader'
        }
      },
      { // loader for media files https://webpack.js.org/loaders/file-loader/
        test: /\.(png|jpg|gif|ico|svg|pvr|pkm|static|ogg|mp3|wav)$/,
        exclude: [path.resolve(__dirname, './node_modules/')],
        use: ['file-loader']
      }
    ]
  }
}
