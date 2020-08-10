const blog = [
  {
    name: "HTML",
    icon: "icon-HTML-",
    router: "/blog/html",
    children: [
      {
        name: "html5",
        router: "/blog/html/html5"
      }
    ]
  },
  {
    name: "CSS",
    icon: "icon-css",
    router: "/blog/css",
    children: [
      {
        name: "css3",
        path: "",
        router: "/blog/css/css3"
      }
    ]
  },
  {
    name: "JAVASCRIPT",
    icon: "icon-java-script",
    router: "/blog/javascript",
    children: [
      {
        name: "原生js",
        router: "/blog/javascript/es"
      }
    ]
  },
  {
    name: "前端框架",
    icon: "icon-kuangjiaframe23",
    router: "/blog/framework",
    children: [
      {
        name: "vue",
        router: "/blog/framework/vue"
      },
      {
        name: "react",
        router: "/blog/framework/react"
      },
      {
        name: "react-native",
        router: "/blog/framework/react-native"
      }
    ]
  },
  {
    name: "组件库",
    icon: "icon-zujian",
    router: "/blog/component",
    children: [
      {
        name: "vue",
        router: "/blog/component/vue"
      }
    ]
  }
];
const music = [
  {
    name: "国语",
    icon: "",
    children: []
  },
  {
    name: "港台",
    icon: "",
    children: []
  },
  {
    name: "欧美",
    icon: "",
    children: []
  }
];
const film = [
  {
    name: "大陆",
    icon: "",
    children: []
  },
  {
    name: "中国香港",
    icon: "",
    children: []
  },
  {
    name: "中国台湾",
    icon: "",
    children: []
  },
  {
    name: "日本",
    icon: "",
    children: []
  },
  {
    name: "泰国",
    icon: "",
    children: []
  },
  {
    name: "英国",
    icon: "",
    children: []
  },
  {
    name: "新加坡",
    icon: "",
    children: []
  }
];
export { blog, music, film };
