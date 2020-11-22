import express from "express";
import User from "../controller/user/user";
const router = express.Router();

/* GET users listing. */
router.post("/register", User.register); //注册账号
export default router;
