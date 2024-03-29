/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const Sass = require('sass')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development'
  return {
    entry: './src/ts/index.ts',
    output: {
      filename: './scripts/main-[hash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    optimization: {
      minimizer: [new TerserPlugin({}), new CssMinimizerPlugin({})]
    },
    devtool: IS_DEV ? 'source-map' : '',
    devServer: {
      hot: true,
      host: '0.0.0.0',
      port: 4000,
      historyApiFallback: true
    },
    stats: {
      children: true
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
                implementation: Sass
              }
            }
          ]
        },
        {
          test: /\.(glsl|vert|frag|vs|fs)$/,
          type: 'asset/source',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: './css/style-[hash].css'
      })
    ]
  }
}
