import axios from 'axios'
import store from '../../store'

export { default as Parabola } from './parabola'

axios.interceptors.request.use(config => {
  store.dispatch('global/gProgress', 50)
  config.headers = Object.assign({}, { 'X-Requested-With': 'XMLHttpRequest' }, config.headers)
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus (response) {
  store.dispatch('global/gProgress', 100)
  if (response.status === 200 || response.status === 304) {
    return response
  }
  // TODO: 检查 500, 400 等 code
  // console.log(response)
  return response
}

function checkCode (res) {
  if (res.data.code === 1) {
    return res.data
  } else {
    // code != 1, 弹 toastr 提示错误
    // toastr(res.data.msg)
  }
  return res.data
}

/**
 * 全局ajax请求适配，不出意外你必须使用此方法发送API请求，options 具体配置参照 axios 文档
 * get 方法： 一般只传 url 和 data 参数
 *
 * @param      {object} options 请求配置，参考：https://github.com/mzabriskie/axios
 * @return     {promise} promise
 */
export function ajax (options) {
  const defaultOpts = {
    method: 'GET',
    timeout: 30000
  }
  const opts = Object.assign({}, defaultOpts, options)
  if (opts.method.toLowerCase() === 'get') {
    return axios.get(opts.url, {params: opts.data}).then(checkStatus).then(checkCode)
  }
  return axios(opts).then(checkStatus).then(checkCode)
}

// REM设置字体大小
(function () {
  const html = document.documentElement
  const hWidth = html.getBoundingClientRect().width

  let fontSize = hWidth / 7.5 + 'px' // 设计稿宽度是750，所以fontSize=100
  html.style.fontSize = fontSize
  // 1rem=100px
})()
