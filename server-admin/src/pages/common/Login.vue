<template>
  <div class="ims-container">
    <div class="login-container">
      <div class="login-container-left"></div>
      <div class="login-container-right">
        <div class="content">
          <p class="content-title">请输入账号密码登录系统</p>
          <el-form :model="formValidate" :rules="rules" ref="loginForm">
            <el-form-item
              label="账户："
              prop="userName"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formValidate.userName"
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
            <el-button size="small" type="primary" @click="login"
              >登录</el-button
            >
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
// import { unit } from '@/services/index'
const loginStorageKey = "wxh-pos-login";

export default {
  data() {
    return {
      checkbox: false,
      valid: false,
      formValidate: {
        userName: "",
        password: "",
      },
      formLabelWidth: "80",
      rules: {
        userName: [
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
  created() {
    let params = this.$route.params;
    if (Object.keys(params).length) {
      this.password = params.password;
      this.phone = params.phone;
    }
  },
  methods: {
    initLoginInfo() {
      let vm = this;
      const info = window.localStorage.getItem(loginStorageKey);
      try {
        let loginInfo = JSON.parse(info);
        vm.phone = loginInfo.phone;
        vm.password = loginInfo.password;
        vm.checkbox = true;
      } catch (error) {
        // ...
      }
    },
    login() {
      let vm = this;
      let params = {
        phone: vm.phone,
        password: vm.password,
      };
      // 记住账号密码功能
      if (vm.checkbox) {
        const info = JSON.stringify(params);
        window.localStorage.setItem(loginStorageKey, info);
      } else {
        window.localStorage.removeItem(loginStorageKey);
      }
      vm.$router.push({ path: "/" });
      // vm.api.account.getToken(params).then(
      // 	(res) => {
      // 		vm.$store.dispatch('account/token', res.token)
      // 		vm.$store.dispatch('account/userInfo', res.user)
      // 		console.log(res.user)
      // 		if (res.user.merchant) {
      // 			vm.$router.push({ path: vm.$route.query.redirect || '/' })
      // 		} else {
      // 			vm.$router.push({
      // 				name: 'update-pos-info',
      // 				params: { id: res.user.id, phone_number: res.user.phone },
      // 			})
      // 		}
      // 	},
      // 	(err) => {
      // 		vm.$message.error(err)
      // 	}
      // )
    },
    register() {
      this.$router.push("/register");
    },
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
