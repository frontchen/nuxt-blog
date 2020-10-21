import http from "../services/http";
import parse from "../services/parse.js";
// 公共接口
const services = {
  url: "http://www.1156zy.com",
  port: 80
};
const services1 = {
  url: "https://www.245bt.com",
  port: ""
};
let api = {
  /********************* www.1156zy.com api *****************/

  // 列表查询
  getList: params => {
    return new Promise((resolve, reject) => {
      http.get("", params, services).then(
        res => {
          return resolve(parse.parseListHtml(res));
        },
        err => {
          reject(err);
        }
      );
    });
  },
  // 列表搜索
  searchList: params => {
    return new Promise((resolve, reject) => {
      http.get("?m=vod-search", params, services).then(
        res => {
          return resolve(parse.parseListHtml(res).body);
        },
        err => {
          reject(err);
        }
      );
    });
  },
  getListItem: params => {
    return new Promise((resolve, reject) => {
      http.get("", params, services).then(
        res => {
          return resolve(parse.parseItemHtml(res));
        },
        err => {
          reject(err);
        }
      );
    });
  },
  /********************* www.245bt.com api *****************/
  // 获得tabs列表
  get245BtHeader: params => {
    return new Promise((resolve, reject) => {
      return http.get("", params, services1).then(
        res => {
          // console.log(["headerres", res]);
          return resolve(parse.parse245BtHeader(res));
          // return resolve(res)
        },
        err => {
          // console.log(["headererr", err]);
          reject(err);
        }
      );
    });
  },
  // 根据tab 拉取list
  get245BtTabData: (prefix, params) => {
    return new Promise((resolve, reject) => {
      http.get(prefix, params, services1).then(
        res => {
          return resolve(parse.parse245BtListHtml(res));
          // return resolve(res)
        },
        err => {
          reject(err);
        }
      );
    });
  },
  // 获得明细详情
  get245BtListItem: path => {
    return new Promise((resolve, reject) => {
      http.get(path, {}, services1).then(
        res => {
          return resolve(parse.parse245BtItemHtml(res));
          // return resolve(res)
        },
        err => {
          reject(err);
        }
      );
    });
  },
  // 解析视频url
  get245BtPlayerUrl: path => {
    return new Promise((resolve, reject) => {
      http.get(path, {}, services1).then(
        res => {
          return resolve(parse.parser245BtPlayerUrl(res));
          // return resolve(res)
        },
        err => {
          reject(err);
        }
      );
    });
  },
  // 模糊搜索
  search245BtBykeywords: params => {
    return new Promise((resolve, reject) => {
      http
        .get("/search.php", params, {
          // url: "http://www.2345ys.org",
          url: services1.url,
          port: services1.port
        })
        .then(
          res => {
            return resolve(parse.parse245BtSearchList(res));
            // return resolve(res)
          },
          err => {
            reject(err);
          }
        );
    });
  }
};
export default api;
