import axios from 'axios'

export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://123.207.32.32:8000/api/hy',
    // baseURL : "http://106.54.54.237:8000/api/hy"
    timeout: 5000
  })

  // 2.请求拦截器
  // instance.interceptors.request.use(function (config) {
  //   // 在发送请求之前做些什么
  //   return config
  // }, function (error) {
  //   // 对请求错误做些什么
  //   return Promise.reject(error)
  // })

  // 3.返回axios实例，axios实例是一个promise
  return instance(config)
}
