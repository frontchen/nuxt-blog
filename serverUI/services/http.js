import axios from "axios";
import querystring from "querystring";
import config from "../config";
// 错误提示
const networkErr = "网络请求超时";

let instance = axios.create({
  timeout: 15 * 1000, // 请求超时时间设置 15s
  withCredentials: false //  带cookie请求
  // headers: { 'Content-Type': '' }
});
// request 拦截器
instance.interceptors.request.use(
  config => {
    // Toast.show('spinner');
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// response 拦截器
instance.interceptors.response.use(
  res => {
    // Toast.hide();
    return res;
  },
  err => {
    return Promise.reject(err.response.data);
  }
);

const http = {
  formatData: (code, res) => {
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        let data = res.data;
        return resolve(data);
      } else {
        return reject(res.statusText);
      }
    });
  },
  request: (method, path, params, options) => {
    return new Promise((resolve, reject) => {
      const methods = ["post", "put", "patch"];
      // 正常拼接方式
      let apiUrl = `${config.apiUrl}:${options.port}${config.apiBaseUrl}${path}`;
      // 自定义链接
      if (options.url) {
        apiUrl = `${options.url}:${options.port}${config.apiBaseUrl}${path}`;
      }
      // 反向代理
      if (config.apiProxy) {
        apiUrl = `${config.apiProxy}${config.apiBaseUrl}${path}`;
      }
      let headers = {};
      let apiParms = [apiUrl, { params, headers }];

      if (options.responseType) {
        apiParms[1].responseType = options.responseType;
      }
      if (methods.includes(method)) {
        let data = params;
        let headers = {
          "Content-Type": "application/json;charset=UTF-8"
        };
        if (options.file) {
          headers["Content-type"] = "multipart/form-data";
        } else if (!options.raw) {
          data = querystring.stringify(params);
          headers["Content-type"] = "application/x-www-form-urlencoded";
        }

        // 拦截JSON对象里面的rel【权限控制】
        if (options.raw) {
          if (data.rel) {
            apiUrl += `?rel=${data.rel}`;
            delete data.rel;
          }
        }
        apiParms = [apiUrl, data, { headers }];
      }
      instance[method](...apiParms).then(
        res => {
          if (path === "barcode/integral/download") {
            return resolve(res.data);
          }
          http.formatData(options.code, res).then(resolve, reject);
        },
        err => {
          return reject(err.msg || networkErr);
        }
      );
    });
  },
  get: (
    path,
    params,
    { url = "", port = 80, code = false, buffer = false }
  ) => {
    const options = { url, port, code };
    if (buffer) {
      options.responseType = "arraybuffer";
    }
    return http.request("get", path, params, options);
  },
  post: (
    path,
    params,
    { url = "", port = 80, code = false, raw = false, file = false }
  ) => {
    const options = { url, port, code, raw, file };
    return http.request("post", path, params, options);
  },
  put: (path, params, { url = "", port = 80, code = false, raw = false }) => {
    const options = { url, port, code, raw };
    return http.request("put", path, params, options);
  },
  patch: (path, params, { url = "", port = 80, code = false, raw = false }) => {
    const options = { url, port, code, raw };
    return http.request("patch", path, params, options);
  }
};

export default http;
