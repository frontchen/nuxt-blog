//语言
import { createI18n } from "vue-i18n"; //引入vue-i18n组件
import store from "../store";
// import { 引入的组件 export 出来的 变量} from 'vue-i18n'
//注册i8n实例并引入语言文件
const i18n = createI18n({
  locale: store.state.language.lang, // 语言标识
  messages: {
    "zh-CN": require("./zh-CN").default, // 中文语言包
    "en-US": require("./en-US").default, // 英文语言包
  },
});
export default i18n; //将i18n暴露出去，在main.js中引入挂载
