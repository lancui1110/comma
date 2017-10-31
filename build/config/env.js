module.exports = {
  local: {
    // 需要用手机查看的时候改成 ip
    publicPath: 'http://localhost:8080/'
  },
  test: {
    publicPath: '//house-test-water.oss.aliyuncs.com/resource/fyb-pc_test/'
  },
  beta: {
    publicPath: '//house-test-water.oss.aliyuncs.com/resource/fyb-pc_beta/'
  },
  prod: {
    publicPath: '//files.fyb365.com/resource/fyb-pc/'
  }
}
