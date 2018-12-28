const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './app/app.js',
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
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: './index.html'
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
      }
    ]
  }
}
