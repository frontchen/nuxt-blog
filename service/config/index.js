// 数据库链接信息
let dbconfig = {
  //mongbodb配置
  development: {
    host: "localhost",
    dbPort: 27017,
    user: "root",
    password: "123456",
    session: {
      name: "BLOG",
      secret: "BLOG",
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    }
  },
  production: {
    host: "http://api.blog.chenzhen.work",
    dbPort: 27017,
    user: "root",
    password: "123456",
    session: {
      name: "BLOG",
      secret: "BLOG",
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    }
  },
  uat: {
    host: "http://api.blog.chenzhen.work",
    dbPort: 27017,
    user: "root",
    password: "123456",
    session: {
      name: "BLOG",
      secret: "BLOG",
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    }
  }
};
let config = {
  //服务器配置
  development: {
    host: "localhost",
    port: 5005
  },
  production: {
    host: "http://blog.chenzhen.work",
    port: 5000
  },
  uat: {
    host: "http://blog.chenzhen.work",
    port: 5000
  }
};
dbconfig = dbconfig[process.env.NODE_ENV];
config = config[process.env.NODE_ENV];
// token相关
const jwtconfig = {
  secretKey: "secretkey",
  expiresIn: 60 * 60 * 24 * 1 // 一天
};

export { dbconfig, jwtconfig, config };
