const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: [path.join(__dirname, 'src', 'js', 'app.js')]
  }, output: {
    path: path.join(__dirname, 'dist'), filename: 'assets/js/bundle.js',
  },

  target: 'node', optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), cssProcessorPluginOptions: {
        preset: ['default', {discardComments: {removeAll: true}}],
      }, canPrint: true
    })],
  }, module: {
    rules: [{
      test: /\.(js|jsx)$/, exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/, use: {
        loader: "babel-loader", options: {
          presets: ["@babel/preset-env"]
        }
      }
    }, {
      test: /\.scss$/,
      use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader']
    }, {
      test: /\.(eot|otf|ttf|woff|woff2)$/, use: [{
        loader: 'url-loader'
      }]
    }, {
      test: /\.(png|jpg|gif|svg)$/, exclude: path.join(__dirname, 'src', 'img'), use: [{
        loader: 'url-loader'
      }]
    },

      {
        test: /\.(png|jpg|jpeg)$/, include: path.join(__dirname, 'src', 'img'), loader: 'file-loader', options: {
          outputPath: (url, resourcePath, context) => {
            url = url.replace(/\\/ig, '/')
            url = url.replace('img/', 'assets/img/')
            return url
          }, publicPath: (url, resourcePath, context) => {
            url = url.replace(/\\/ig, '/')
            url = url.replace('img/', '../img/')
            return url
          }, regExp: /src\\(.*)/i, name: '[1]'
        }
      },]
  }, plugins: [new BrowserSyncPlugin({
    host: 'localhost.loc', open: true, port: 3000, server: {baseDir: ['dist']}
  }),

    new CopyWebpackPlugin([{from: 'src/img/', to: 'assets/img/',}]), new ImageminPlugin({
      pngquant: {
        quality: '100'
      }, plugins: [imageminMozjpeg({
        quality: 90, progressive: true
      })]
    }),
    new CopyWebpackPlugin([{from: 'src/files/', to: 'assets/files/',}]),
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
    }), new webpack.ProvidePlugin({
      $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'
    }), new HtmlWebpackPlugin({
      inject: false, template: './src/index.html', filename: 'index.html', minify: {
        removeComments: true, collapseWhitespace: false,
      }
    }),]
};