import { createStore, createLogger } from "vuex";
// import createLogger from "vuex/dist/logger"; // 日志调试
import modules from "./modules/index"; // 模块

const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: {
    ...modules,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  mutations: {
    clearAllData: () => {},
  },
});
export default store;
