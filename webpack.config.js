const path = require('path');
// const extract = require("mini-css-extract-plugin");

module.exports = {
  entry: './example/src/app.js',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // {
          //   loader: extract.loader
          // },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  // plugins: [
  //   new extract({
  //     filename: 'bundle.css'
  //   })
  // ],
  mode: 'development'
}