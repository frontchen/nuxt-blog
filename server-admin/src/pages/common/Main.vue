<template>
  <el-container>
    <main-header></main-header>
    <el-main>
      <el-aside width="200px">
        <main-menu></main-menu>
      </el-aside>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <main-footer></main-footer>
    </el-footer>
  </el-container>
</template>

<script>
import { mapState } from "vuex";

import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import MainMenu from "./MainMenu";
export default {
  name: "page-main",
  components: {
    "main-header": MainHeader,
    "main-footer": MainFooter,
    "main-menu": MainMenu,
  },
  computed: {
    ...mapState({
      cname: (state) =>
        state.account.userInfo ? state.account.userInfo.cname : "",
    }),
  },
  mounted() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      document.title = "blog管理后台";
    },
  },
  watch: {
    cname() {
      this.setTitle();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/Base.less";

.el-layout-header {
  background: inherit;
  padding: 0;
  height: inherit;
  line-height: inherit;
}
.el-layout-sider {
  width: 234px !important;
  min-width: 234px !important;
  max-width: 234px !important;
  flex: 0 0 234px !important;
  background: inherit;
}
.el-layout-footer {
  font-size: 12px;
  color: @ims-gray-color;
  text-align: center;
}
</style>
