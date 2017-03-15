
const path = require('path')

module.exports = {
  entry: './docs/app.js',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs')
  }
}
