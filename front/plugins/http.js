import axios from "axios";
import querystring from "querystring";
import config from "../config";
import store from "../store/index";

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
    let token = store.state.login.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// response 拦截器
instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        store.dispatch("login/userLogout").then(
          () => {
            location.reload();
          },
          () => {}
        );
      }
    }
    return Promise.reject(err.response.data);
  }
);

const http = {
  formatData: (code, res) => {
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        let data = res.data;
        if (data.code === "10004") {
          store.dispatch("login/userLogout").then(
            () => {
              location.reload();
            },
            () => {}
          );
          return reject(data.msg);
        }
        if (code) {
          return resolve(data);
        }
        if (data.code * 1 === 0) {
          return resolve(data.data || "");
        } else {
          return reject(data.msg || networkErr);
        }
      } else {
        return reject(res.statusText);
      }
    });
  },
  get: (path, params, { url = "", port = 8801, code = false }) => {
    return new Promise((resolve, reject) => {
      let apiUrl = `${config.apiUrl}:${port}${config.apiBaseUrl}${path}`;
      if (url) {
        apiUrl = `${url}:${port}${config.apiBaseUrl}${path}`;
      }
      instance.get(apiUrl, { params: params }).then(
        res => {
          if (config.environment === "dev") {
            console.log([apiUrl, params, res.data]);
          }
          http.formatData(code, res).then(resolve, reject);
        },
        err => {
          reject(err.msg || networkErr);
        }
      );
    });
  },
  post: (
    path,
    params,
    { url = "", port = 8801, code = false, raw = false, file = false }
  ) => {
    return new Promise((resolve, reject) => {
      let data = params;
      let headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };

      if (file) {
        headers["Content-type"] = "multipart/form-data";
      } else if (!raw) {
        data = querystring.stringify(params);
        headers["Content-type"] = "application/x-www-form-urlencoded";
      }

      let apiUrl = `${config.apiUrl}:${port}${config.apiBaseUrl}${path}`;
      if (url) {
        apiUrl = `${url}:${port}${config.apiBaseUrl}${path}`;
      }

      instance.post(apiUrl, data, { headers }).then(
        res => {
          if (config.environment === "dev") {
            console.log([apiUrl, data, res.data]);
          }
          http.formatData(code, res).then(resolve, reject);
        },
        err => {
          return reject(err.msg || networkErr);
        }
      );
    });
  }
};

export default http;
