const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "app.css"
});

module.exports = {

  entry: path.resolve(__dirname, '../app/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../public/build'),
    filename: 'app.js',
    publicPath: '/build',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js|\.jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-airbnb']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        }),
      },
    ]
  },
  plugins: [ 
    extractSass
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  watch: true,
}