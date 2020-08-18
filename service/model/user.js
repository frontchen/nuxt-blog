import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  username: String,
  role: String, //superAdmin 超级管理员 admin 管理员 user 用户
  password: String,
  parentid: Number,
  status: String //ENABLED 启用 DISABLED //停用
});
const User = mongoose.model("user", userSchema);
User.index({
  username: "admin",
  password: "admin",
  status: "ENABLED",
  role: "superAdmin",
  id: 0
});
export default User;
