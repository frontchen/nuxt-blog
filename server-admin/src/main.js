import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.config.productionTip = false;
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount("#app");
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
