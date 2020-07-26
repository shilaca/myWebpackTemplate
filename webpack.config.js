/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const Sass = require('sass')
const Fiber = require('fibers')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development'
  return {
    entry: './src/ts/index.ts',
    output: {
      filename: './scripts/main-[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})]
    },
    devtool: IS_DEV ? 'source-map' : '',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      watchContentBase: true,
      port: 3000,
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.worker\.(js|ts)$/,
          loader: 'worker-loader',
          options: {
            name: 'workers/' + (IS_DEV ? '[name].js' : '[name].[hash].js')
          }
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader'
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: Sass,
                sassOptions: {
                  fiber: Fiber
                }
              }
            }
          ]
        },
        {
          test: /\.(glsl|vert|frag|vs|fs)$/,
          use: ['raw-loader'],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        exclude: ['img']
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: './css/style-[hash].css'
      })
      // new CopyWebpackPlugin({
      //   patterns: [{ from: './src/assets', to: './assets' }]
      // })
    ]
  }
}
