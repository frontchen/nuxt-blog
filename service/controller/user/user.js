import UserModal from "../../model/user/user";
class User {
  register = (err, req, res, next) => {
    if (err) {
      return res.json(err);
    }
    console.log(["req", req]);
  };
}
export default new User();
