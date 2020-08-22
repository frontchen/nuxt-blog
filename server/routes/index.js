import users from "./users";
import film from "./film";
import music from "./music";
/* GET home page. */

export default app => {
  app.use("/user", users);
  app.use("/film", film);
  app.use("/music", music);
};
