var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var ZipWebpackPlugin = require('zip-webpack-plugin')
var ManifestPlugin = require('./plugins/manifest')

var pkg = require('../package.json')
var utils = require('./utils')
var config = require('../config')
var provide = require('./config/provide')

var env = config.build.env


// var h5Assets = []
// h5Assets = h5Assets.concat(fs.readdirSync(path.resolve('src/H5/h5/css')).map(item => 'h5/css/' + item))
// h5Assets = h5Assets.concat(fs.readdirSync(path.resolve('src/H5/h5/js')).map(item => 'h5/js/' + item))
// h5Assets = h5Assets.concat(fs.readdirSync(path.resolve('src/H5/h5/img')).map(item => 'h5/img/' + item))

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[name].[chunkhash].js')
  },
  plugins: [
    new webpack.ProvidePlugin(provide),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 打包时候暂时不用打出 html 文件
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      // minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      // },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      // {
      //   from: path.resolve(__dirname, '../src/H5'),
      //   to: config.build.assetsSubDirectory,
      //   ignore: ['.*']
      // }
    ]),
    // 懒加载静态上传需要处理的, 注意：ManifestPlugin必须放在ZipWebpackPlugin之前
    new ManifestPlugin({
      versionFiles: [
        'app.css',
        'common.js',
        'vendor.js',
        'app.js',
        'favicon.ico',
        // h5 首页，特殊处理
        // ...h5Assets
      ],
      hashNum: 7
    }),
    // https://github.com/erikdesjardins/zip-webpack-plugin
    // 这个插件放在最后，因为 dev-build.js 里面需要把它 pop 出来
    new ZipWebpackPlugin({
      path: '../zip', //relative (to Webpack output path)
      filename: `${pkg.name}.zip`,
      exclude: [/\.html$/]
    }),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
