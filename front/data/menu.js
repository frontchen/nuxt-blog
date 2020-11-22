const blog = [
  {
    label: "HTML",
    icon: "icon-HTML-",
    name: "html",
    type: "blog",
    children: [
      {
        parent: "html",
        label: "html5",
        name: "html5",
        type: "blog"
      }
    ]
  },
  {
    label: "CSS",
    icon: "icon-css",
    name: "css",
    type: "blog",
    children: [
      {
        label: "css3",
        parent: "css",
        name: "css3",
        type: "blog"
      }
    ]
  },
  {
    label: "JAVASCRIPT",
    icon: "icon-java-script",
    type: "blog",
    name: "javascript",
    children: [
      {
        label: "原生js",
        name: "nativeJs",
        parent: "javascript",
        type: "blog"
      }
    ]
  },
  {
    label: "前端框架",
    icon: "icon-kuangjiaframe23",
    type: "blog",
    name: "framework",
    children: [
      {
        label: "vue",
        parent: "framework",
        name: "vue",
        type: "blog"
      },
      {
        label: "react",
        parent: "framework",
        name: "react",
        type: "blog"
      },
      {
        label: "react-native",
        parent: "framework",
        name: "react-native",
        type: "blog"
      }
    ]
  },
  {
    label: "组件库",
    icon: "icon-zujian",
    type: "blog",
    name: "component",
    children: [
      {
        label: "vue",
        parent: "component",
        name: "vue",
        type: "blog"
      }
    ]
  }
];
const music = [
  {
    label: "国语",
    name: "mandarin",
    type: "music",
    icon: "",
    children: []
  },
  {
    label: "港台",
    icon: "",
    name: "hkAndTai",
    type: "music",
    children: []
  },
  {
    label: "欧美",
    icon: "",
    name: "europeAndAmerica",
    type: "music",
    children: []
  }
];
const film = [
  {
    label: "大陆",
    name: "mainland",
    type: "film",
    icon: "",
    children: []
  },
  {
    label: "中国香港",
    name: "hongKong",
    type: "film",
    icon: "",
    children: []
  },
  {
    label: "中国台湾",
    name: "taiwan",
    type: "film",
    icon: "",
    children: []
  },
  {
    label: "日本",
    type: "film",
    name: "japan",
    icon: "",
    children: []
  },
  {
    label: "泰国",
    type: "film",
    name: "thailand",
    icon: "",
    children: []
  },
  {
    label: "英国",
    type: "film",
    name: "unitedKingdom",
    icon: "",
    children: []
  },
  {
    label: "新加坡",
    type: "film",
    name: "singapore",
    icon: "",
    children: []
  }
];
export { blog, music, film };
