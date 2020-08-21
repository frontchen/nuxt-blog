import http from "http";
import querystring from "querystring";
import { config } from "../config";
const axios = {
  request: (method, path, params, options = {}) => {
    return new Promise((resolve, reject) => {
      const data = querystring.stringify(params);
      const methods = {
        post: "POST",
        put: "PUT",
        patch: "PATCH"
      };
      const option = {
        hostname: config.host,
        port: config.port,
        path: path,
        method: methods[method] || method
      };
      if (options.url) option.hostname = options.url;
      if (options.port) option.port = options.port;
      if (options.responseType) option.responseType = options.responseType;
      if (method.hasOwnProperty(methods)) {
        option.headers = {
          "Content-Type": "application/json;charset=UTF-8"
        };
        if (options.file) {
          option.headers["Content-type"] = "multipart/form-data";
        } else if (!options.raw) {
          option.headers["Content-type"] = "application/x-www-form-urlencoded";
        }
      }
      const req = http.request(option, res => {
        res.setEncoding("utf8");
        let str = "";
        res.on("data", chunk => {
          str += chunk;
        });
        res.on("end", () => {
          resolve(str);
        });
      });
      req.on("error", err => {
        reject(err.message);
      });
      req.write(data);
      req.end();
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
    return axios.request("get", path, params, options);
  },
  post: (
    path,
    params,
    { url = "", port = 80, code = false, raw = false, file = false }
  ) => {
    const options = { url, port, code, raw, file };
    return axios.request("post", path, params, options);
  },
  put: (path, params, { url = "", port = 80, code = false, raw = false }) => {
    const options = { url, port, code, raw };
    return axios.request("put", path, params, options);
  },
  patch: (path, params, { url = "", port = 80, code = false, raw = false }) => {
    const options = { url, port, code, raw };
    return axios.request("patch", path, params, options);
  }
};
export default axios;
