
const path = require('path')

module.exports = {
  entry: './examples/app.js',
  output: {
    path: path.join(__dirname, 'examples'),
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
    contentBase: path.join(__dirname, 'examples')
  }
}
