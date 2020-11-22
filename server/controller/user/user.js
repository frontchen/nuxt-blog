import UserModal from "../../model/user/user";
class User {
  register = (req, res, next) => {
    console.log(["req", req]);
    const { username, password } = req.body || {};
    if (!username) {
      return res.send({
        code: 1,
        data: null,
        message: "用户名不能为空"
      });
    }
    if (!password) {
      return res.send({
        code: 1,
        data: null,
        message: "密码不能为空"
      });
    }
    UserModal.create({});
    res.send({
      code: 0,
      data: null,
      msg: "注册成功"
    });
  };
}
export default new User();
