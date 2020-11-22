import mongoose from "mongoose";
import { dbconfig } from "../config";
import chalk from "chalk";
// console.log(dbconfig);mongodb://root@localhost:27017/?authSource=blog
const DB_URL = `mongodb://${dbconfig.user}:${dbconfig.password}@${dbconfig.host}:${dbconfig.dbPort}/blog`;
console.log(["DB_URL", DB_URL]);
mongoose.Promise = global.Promise;
/**
 * 连接
 */
mongoose.connect(DB_URL);

const db = mongoose.connection;

db.once("open", () => {
  // console.log(chalk.green("连接数据库成功"));
});

db.on("error", function(error) {
  // console.error(chalk.red("Error in MongoDb connection: " + error));
  mongoose.disconnect();
});

db.on("close", function() {
  // console.log(chalk.red("数据库断开，重新连接数据库"));
  mongoose.connect(DB_URL, { server: { auto_reconnect: true } });
});

export default db;
