require('./check-versions')()

process.env.NODE_ENV = 'production'

var inquirer = require('inquirer')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var yargs = require('yargs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var publicEnv = require('./config/env')


// 选择 编译环境
inquirer.prompt({
  type: 'list',
  name: 'env',
  message: '\n\n选择编译到哪个环境?',
  choices: ['local', 'test', 'beta', 'prod'],
  default: ['local']
}).then((res) => {
  webpackConfig.output.publicPath = publicEnv[res.env].publicPath
  if (yargs.argv.watch) {
    webpackConfig.watch = true
  }

  var spinner = ora('building for production...')
  spinner.start()

  rm(path.resolve('zip'), err => {})
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
})
