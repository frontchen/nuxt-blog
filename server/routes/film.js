import express from "express";
import Film from "../controller/film/film";
const router = express.Router();

/* GET film header. */
router.get("/getHeader", Film.getHeader);
router.get("/getList", Film.getList);
router.get("/getListItem", Film.getListItem);
router.get("/parsePlayerUrl", Film.parsePlayerUrl);
router.get("/searchListBywords", Film.searchListBywords);
export default router;
