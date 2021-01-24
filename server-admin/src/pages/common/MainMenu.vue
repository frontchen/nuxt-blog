<template>
  <div class="ims-left-main-menu">
    <div class="main-menu-list">
      <el-menu
        :active-name="activeMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :accordion="true"
        width="auto"
        :collapse="!sidebar.opend"
        :open-names="openMenu"
        @on-select="menuSelect"
        @on-open-change="menuChange"
      >
        <el-submenu
          popper-append-to-body
          popper-class="main-menu-list-popper"
          v-for="(item, index) in menuList"
          :key="index"
          :index="`${index}`"
          :name="item.name"
        >
          <template #title>
            <i :class="item.icon"></i>
            <span v-if="sidebar.opend"> {{ item.name }}</span>
          </template>
          <el-menu-item
            v-show="sidebar.opend"
            v-for="(val, i) in item.children"
            :key="i"
            :index="`${index}-${i}`"
            :name="val.name"
            :to="val.path"
            @click.native="menuClick(val)"
          >
            <template #title>
              <div>{{ val.name }}</div>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { storeKey } from "@/data/index";
import { mapState } from "vuex";
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
    ...mapState({
      sidebar: (state) => state.app.sidebar,
    }),
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
  mounted() {
    console.log(this.sidebar);
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
