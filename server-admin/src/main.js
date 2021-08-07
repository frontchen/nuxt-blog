import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import VueI18n from "./lang";
import "element-plus/lib/theme-chalk/index.css";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.config.productionTip = false;
app
  .use(router)
  .use(store)
  .use(VueI18n)
  .use(ElementPlus)
  .use(VueI18n);
app.mount("#app");
