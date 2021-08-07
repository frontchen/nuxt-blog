<template>
  <router-view />
</template>

<script>
import { storeKey } from "@/data";

export default {
  name: "App",
  created() {
    this.resetStore();
  },
  methods: {
    // 解决防止刷新页面 vuex store 丢失的问题
    resetStore() {
      // 在页面加载时读取sessionStorage里的状态信息
      const sessionStore = window.sessionStorage.getItem(storeKey.vuexStore);
      if (sessionStore) {
        let store = {};
        Object.assign(store, this.$store.state, JSON.parse(sessionStore));
        this.$store.replaceState(store);
        window.sessionStorage.removeItem(storeKey.vuexStore);
      }

      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // ie、谷歌、360 页面刷新执行顺序 onbeforeunload -> onunload -> onload，关闭执行顺序 onbeforeunload -> onunload
      // firefox 页面刷新只执行 onunload，页面关闭只执行 onbeforeunload
      let eventName = "beforeunload";
      const fireFox = navigator.userAgent.indexOf("Firefox") !== -1;
      if (fireFox) {
        eventName = "unload";
      }
      window.addEventListener(eventName, () => {
        // 根据 currentRefresh 判断是退出还是刷新
        const currentRefresh = this.$store.state.account.currentRefresh;
        if (currentRefresh) {
          window.sessionStorage.setItem(
            storeKey.vuexStore,
            JSON.stringify(this.$store.state)
          );
        }
      });

      // console.log(JSON.stringify(this.$store.state))
    },
  },
};
</script>

<style lang="less">
@import "./styles/Base.less";
</style>
