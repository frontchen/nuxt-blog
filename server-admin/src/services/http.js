import axios from 'axios'
import querystring from 'querystring'
import config from '../config'
import store from '../store/index'
import { permission } from '@/services/index'

// 错误提示
const networkErr = '网络请求超时'

// 从配置获取白名单路径
const whitelist = config.whitelist

let instance = axios.create({
  timeout: 15 * 1000, // 请求超时时间设置 15s
  withCredentials: false //  带cookie请求
  // headers: { 'Content-Type': '' }
})

// request 拦截器
instance.interceptors.request.use(
  config => {
    // 过滤白名单
    let filter = whitelist.filter(v => {
      return config.url.indexOf(v.path) !== -1
    })
    let token = store.state.account.token
    let sysId = store.state.account.sysId
    if (token && !filter.length) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.sysId = sysId
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// response 拦截器
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if (res.data.code === '10004') {
        permission.logout()
      }
    }
    return res
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        permission.logout()
      }
    }
    return Promise.reject(err.response.data)
  }
)

const http = {
  formatNetData(res) {
    res.code = res.Result === 1 ? 0 : res.Result
    res.msg = res.Message
    res.data = ''
    let data = res.Data
    if (data) {
      if (data.substring(0, 1) === '[' || data.substring(0, 1) === '{') {
        try {
          res.data = JSON.parse(res.Data)
        } catch (e) {
          // ...
        }
      } else {
        res.data = data
        if (data === 'null') {
          res.data = null
        }
      }
    }
    if (res.PageNumber) {
      if (!res.data || !res.data.RowData) {
        res.data = {
          RowData: res.data,
          // PageIndex: 1,
          TotalCount: res.Count || 0,
          PageSize: res.PageNumber,
          PageCount: Math.ceil(res.Count / res.PageNumber)
        }
      }
    }
    delete res.Result
    delete res.Message
    delete res.Data
    return res
  },
  formatData: (code, res) => {
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        let data = res.data
        // net
        if (data.Result) {
          data = http.formatNetData(data)
        }
        if (code) {
          return resolve(data)
        }
        if (data.code * 1 === 0) {
          return resolve(data.data || '')
        } else {
          return reject(data.msg || networkErr)
        }
      } else {
        return reject(res.statusText)
      }
    })
  },
  get: (path, params, { url = '', port = 8810, code = false }) => {
    return new Promise((resolve, reject) => {
      let apiUrl = `${config.apiUrl}:${port}${config.apiBaseUrl}${path}`
      if (url) {
        apiUrl = `${url}:${port}${config.apiBaseUrl}${path}`
      }
      instance.get(apiUrl, { params }).then(
        res => {
          // if (config.environment === 'dev') {
          //   console.log([apiUrl, params, res.data])
          // }
          http.formatData(code, res).then(resolve, reject)
        },
        err => {
          return reject(err.msg || networkErr)
        }
      )
    })
  },
  post: (
    path,
    params,
    { url = '', port = 8810, code = false, raw = false, file = false }
  ) => {
    return new Promise((resolve, reject) => {
      let data = params
      let headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }

      if (file) {
        headers['Content-type'] = 'multipart/form-data'
      } else if (!raw) {
        data = querystring.stringify(params)
        headers['Content-type'] = 'application/x-www-form-urlencoded'
      }

      let apiUrl = `${config.apiUrl}:${port}${config.apiBaseUrl}${path}`
      if (url) {
        apiUrl = `${url}:${port}${config.apiBaseUrl}${path}`
      }
      // 拦截JSON对象里面的rel【权限控制】
      if (raw) {
        if (data.rel) {
          apiUrl += `?rel=${data.rel}`
          delete data.rel
        }
      }
      instance
        .post(apiUrl, data, {
          headers
        })
        .then(
          res => {
            // if (config.environment === 'dev') {
            //   console.log([apiUrl, data, res.data])
            // }
            http.formatData(code, res).then(resolve, reject)
          },
          err => {
            return reject(err.msg || networkErr)
          }
        )
    })
  }
}

export default http
