module.exports = {
  local: {
    // 需要用手机查看的时候改成 ip
    publicPath: 'http://weixinentdev.comma.com/comma/'
  },
  test: {
    publicPath: '//house-test-water.oss.aliyuncs.com/resource/fyb-pc_test/'
  },
  beta: {
    publicPath: '//house-test-water.oss.aliyuncs.com/resource/fyb-pc_beta/'
  },
  prod: {
    publicPath: '//http://nb.comma.com.cn/h5/'
  }
}
