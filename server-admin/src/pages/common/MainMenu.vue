<template>
  <div class="ims-left-main-menu">
    <div class="main-menu-list">
      <el-menu
        :active-name="activeMenu"
        theme="light"
        :accordion="true"
        width="auto"
        :open-names="openMenu"
        @on-select="menuSelect"
        @on-open-change="menuChange"
      >
        <el-submenu
          v-for="(item, index) in menuList"
          :key="index"
          :index="`${index}`"
          :name="item.name"
        >
          <template #title>
            <i :class="item.icon"></i>
            {{ item.name }}
          </template>
          <el-menu-item
            v-for="(val, i) in item.children"
            :key="i"
            :index="`${index}-${i}`"
            :name="val.name"
            :to="val.path"
            @click.native="menuClick(val)"
            >{{ val.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { storeKey } from "@/data/index";

export default {
  name: "page-main-menu",
  data() {
    return {
      activeMenu: "",
      openMenu: [""],
    };
  },
  computed: {
    menuList() {
      return [
        {
          name: this.$t("menu.workM"),
          icon: "el-icon-user",
          children: [
            {
              name: "企业信息",
              path: "/account-management/enterpriseInfo/list",
            },
            {
              name: "账户管理",
              path: "/account-management/accountManage/surmax",
            },
          ],
        },
      ];
    },
  },
  created() {
    let openMenu = window.sessionStorage.getItem(storeKey.menuOpen);
    let activeMenu = window.sessionStorage.getItem(storeKey.menuActive);
    if (openMenu) {
      openMenu = JSON.parse(openMenu);
    }

    this.openMenu = openMenu || [];
    this.activeMenu = activeMenu;
    // this.menuList = this.fullList
  },
  methods: {
    menuClick(val) {
      if (!val.path) {
        this.$ims.alert({
          title: this.$t("common.msg"),
          content: this.$t("common.deniedTips"),
          okText: this.$t("action.close"),
          showCancel: false,
          onOk: () => {},
        });
      }
    },
    menuSelect(name) {
      this.activeMenu = name;
      window.sessionStorage.setItem(storeKey.menuActive, name);
    },
    menuChange(names) {
      this.openMenu = names;
      window.sessionStorage.setItem(storeKey.menuOpen, JSON.stringify(names));
    },
  },
};
</script>
