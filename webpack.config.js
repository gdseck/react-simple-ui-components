var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/examples/public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    './examples/js/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'examples'),
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    root: [path.resolve(__dirname)],
    extensions: ['', '.js', '.jsx', '.css', '.json']
  },
  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
}
