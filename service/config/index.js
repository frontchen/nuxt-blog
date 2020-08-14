// 数据库链接信息
let dbconfig = {
  //mongbodb配置
  development: {
    host: "localhost",
    dbPort: 27017,
    user: "root",
    password: "123456"
  },
  production: {
    host: "http://api.blog.chenzhen",
    dbPort: 27017,
    user: "root",
    password: "123456"
  },
  uat: {
    host: "http://api.blog.chenzhen",
    dbPort: 27017,
    user: "root",
    password: "123456"
  }
};
dbconfig = dbconfig[process.env.NODE_ENV];
// token相关
const jwtconfig = {
  secretKey: "secretkey",
  expiresIn: 60 * 60 * 24 * 1 // 一天
};

module.exports = {
  dbconfig,
  jwtconfig
};
