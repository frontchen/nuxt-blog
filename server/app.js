import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import routes from "./routes";
// import "./mongodb/db";
const app = express();
// console.log(app.get("env"));
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, "public")));

routes(app);
//处理跨域请求
app.all("*", function (req, res, next) {
  // const orginList = ['http://www.maguochang.com']
  // if (orginList.includes(req.headers.origin.toLowerCase())) {
  //   //设置允许跨域的域名，*代表允许任意域名跨域
  //   res.header('Access-Control-Allow-Origin', req.headers.origin)
  // }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", false);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.url !== "/favicon.ico") {
    if (req.method.toLowerCase() === "options") {
      // 让options尝试请求快速结束
      res.send(200);
    } else {
      next();
    }
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  // res.render("error");
});

export default app;
