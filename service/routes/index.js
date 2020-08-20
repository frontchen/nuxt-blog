import users from "./users";
import film from "./film";
import music from "./music";
/* GET home page. */

const index = (req, res, next) => {
  res.render("index", { title: "Express" });
};
export default (app) => {
  app.use("/", index);
  app.use("/user", users);
  app.use("/film", film);
  app.use("/music", music);
};
