const htmlWebpackPlugin = require('html-webpack-plugin')
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = {
  mode: 'development',
  output: {
    publicPath: 'auto'
  },
  devServer: {
    port: 8081,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      // 远程应用暴露出的模块名
      exposes: {
        './MarketingApp': './src/App.js'
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          import: 'react', // the "react" package will be used a provided and fallback module
          shareKey: 'react', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
          eager: true,
        },
        'react-dom': {
          requiredVersion: deps['react-dom'],
          singleton: true,
          eager: true
        },
        'react-router-dom': {
          requiredVersion: deps['react-router-dom'],
          singleton: true, // only a single version of the shared module is allowed
          eager: true
        }
      }
    }),
    new htmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}