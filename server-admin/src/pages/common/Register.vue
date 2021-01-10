<template>
  <div class="ims-container">
    <div class="login-container">
      <div class="login-container-left"></div>
      <div class="login-container-right">
        <div class="content">
          <p class="content-title">请注册账号密码登录系统</p>
          <el-form :model="formValidate" :rules="rules" ref="loginForm">
            <el-form-item
              label="用户名："
              prop="username"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formValidate.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="登录密码："
              prop="password"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formValidate.password"
                type="password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="login-button">
            <el-button size="small" type="danger" @click="register"
              >注册</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { unit } from "@/services/index";
const loginStorageKey = "wxh-pos-login";

export default {
  data() {
    return {
      checkbox: false,
      valid: false,
      formValidate: {
        username: "",
        password: "",
      },
      formLabelWidth: "80",
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],

        password: [
          {
            required: true,
            message: "登录密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    register() {},
  },
};
</script>
<style lang="less" scoped>
.init() {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
/deep/html,
body {
  .init();
}
/deep/#app {
  .init();
}
.ims-container {
  .init();
  .login-container {
    height: 100%;
    display: flex;
    width: 100%;
    &-left {
      width: 35%;
      background-image: url("/static/img/login.jpg");
      background-size: auto auto;
      background-size: cover;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 600px;
      height: 100%;
      overflow: hidden;
    }
    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .content {
        width: 50%;
        &-title {
          text-align: center;
          font-size: 18px;
        }
      }
    }
  }
}

.forget-password {
  margin-left: 15px;
  margin-bottom: 6px;
}
</style>
