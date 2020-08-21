import express from "express";
import Film from "../controller/film/film";
const router = express.Router();

/* GET film header. */
router.get("/", Film.getHeader);
export default router;
