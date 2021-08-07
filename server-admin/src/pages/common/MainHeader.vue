<template>
  <div class="ims-main-header">
    <el-header>
      <el-row class="ims-main-header-row">
        <el-col :span="12">
          <i class="el-icon-s-operation" @click.stop="toggleSlidebar"></i>
        </el-col>
        <el-col :span="12">
          <el-dropdown @command="toggleLang">
            <span class="el-dropdown-link">
              {{ lang }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
                <el-dropdown-item command="en-US">英文</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { permission } from "@/services/index";
export default {
  name: "page-main-header",

  data() {
    return {
      drawer: null, // sidebar drawer
      lang: "中文",
      langEnum: {
        ["zh-CN"]: "中文",
        ["en-US"]: "英文",
      },
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) =>
        state.account.userInfo || {
          cname: this.$t("common.companyName"),
          uname: "",
        },
    }),
  },
  methods: {
    toggleLang(lang) {
      this.$i18n.locale = lang;
      this.lang = this.langEnum[lang];
      this.$store.dispatch("language/setLanguage", lang);
    },
    toggleSlidebar() {
      this.$store.dispatch("app/toogleSideBar", this.$store.state.app.sidebar);
    },
    logout() {
      permission.logout();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/colors.less";
@el-css-prefix: el-;
@ims-header-prefix: ims-main-header;

.@{ims-header-prefix} {
  width: 100%;
  background-color: @ims-header-bg;

  .@{el-css-prefix}header {
    padding: 0;
    height: 40px !important;
    line-height: 40px !important;
  }
  &-row {
    display: flex;
    width: 100%;
    .@{el-css-prefix}col-12 {
      width: 50%;
      .@{el-css-prefix}icon-s-operation {
        margin-left: 4px;
        font-size: 16px;
        color: @ims-gray-bgColor;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}

.ims-header-dropdown-menu {
  .ivu-dropdown-item {
    font-size: 16px !important;
  }
}
.ims-menu {
  background-color: @ims-gray2-color;
}
</style>
