const path = require('path');

module.exports = function (env, argv) {
  return {
    entry: {
      'mouse-detection': './index.js',
      'example': './example/src/example.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env"]
              ],
              plugins: [
                "@babel/plugin-transform-arrow-functions"
              ],
            }            
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
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
    mode: 'development'
  };
}
