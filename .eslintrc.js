// http://eslint.org/docs/user-guide/configuring
var provide = require('./build/config/provide')

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-labels': 0,
    'func-call-spacing': 0,
    'no-unexpected-multiline': 0,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'eqeqeq': 0
  },
  globals: Object.assign({
    localStoreage: true,
    pageConfig: true,
    ap: true,
    AlipayJSBridge: true,
    wx: true,
    WeixinJSBridge: true,
    ap: true,
  }, provide)
}
