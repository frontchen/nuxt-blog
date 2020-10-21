import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  username: {
    type: String,
    unique: true //用户名不能重复
  },
  role: String, //superAdmin 超级管理员 admin 管理员 user 用户
  password: String,
  status: String //ENABLED 启用 DISABLED //停用
});
userSchema.index({
  username: "admin",
  password: "admin",
  status: "ENABLED",
  role: "superAdmin",
  id: 0
});
const User = mongoose.model("user", userSchema);

export default User;
