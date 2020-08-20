import express from "express";
import users from "./users";
const router = express.Router();

/* GET home page. */

const index = (req, res, next) => {
  res.render("index", { title: "Express" });
};
export default app => {
  app.use("/", index);
  app.use("/user", users);
};
