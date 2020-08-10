const pkg = require("./package");
module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  router: {
    middleware: ["route"]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "element-ui/lib/theme-chalk/display.css",
    "~/assets/css/main.less",
    "~/assets/font/iconfont.css",
    "~/static/css/animate.min.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/element-ui"],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0"
  }
};
