module.exports = {
  title: "芒梨博客", //标题
  keywords: "前端开发",
  description: "个人博客",
  repo: "git@github.com:karry-liao/studyblog.github.io.git", //仓库地址
  base:"/studyblog.github.io/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  lastUpdated: "Last Updated",
  configureWebpack: {
    node: {
      global: true,
    },
  },
  plugins: [
    [
      //先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["wanko"],
        clean: true,
        messages: {
          welcome: "我是lookroot欢迎你的关注 ",
          home: "心里的花，我想要带你回家。",
          theme: "好吧，希望你能喜欢我的其他小伙伴。",
          close: "再见哦",
        },
        width: 240,
        height: 352,
        modelStyle: {
          right: "-45px",
          bottom: "-95px",
          opacity: "0.9",
        },
      },
    ],
    ["copy-code1", { hint: "复制成功！" }],
  ],
  themeConfig: {
    //主题配置
    smoothScroll: true,
    logo: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201911%2F30%2F20191130103938_uNhF5.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664606884&t=978883c3b180812cc76c793f1f6a6b92",
    nav: [
      //导航栏
      { text: "首页", link: "/" },
      { text: "JS", link: "/Components/js_docs/JS" },
      { text: "Vue", link: "/Components/md_view/vue"},
      {
        text: "计算机网络知识",
        link: "/Components/cp_netservice/cpnetservice",
      },
      {
        text: "面试总结",
        link: "/Components/md_interview/interview",
      },
      {
        text: "2021",
        ariLabel: "2021",
        items: [
          //多级导航栏
          { text: "May", link: "/2020/5/" },
          { text: "June", link: "/2020/6/" },
        ],
      },
      { text: "github", link: "" },
    ],
    sidebar: {
      //侧边拦
      "/Components/": [
        {
          title: "开发指南",
          collapsable: false,
          children: [
            // ["base/introduce", "介绍"],
            // ["base/start", "快速开始"],
          ],
        },
        {
          title: "静态组件",
          collapsable: false,
          children: [
            // ["static/Icon", "图标"],
            // ["static/Svg", "SVG变色图标"],

          ],
        },
        {
          title: "动态组件",
          collapsable: false,
          children: [
            // ["dynamic/DragSort", "拖拽排序"],
            // ["dynamic/ScrollInto", "滚动入场动画"],
            // ["dynamic/ScrollFollow", "滚动跟随动画"],
            // ["dynamic/PdrPul", "上拉加载下拉刷新"],
            // ["dynamic/UploadFile", "文件上传"],
            // ["dynamic/UploadImg", "图片上传"],
            // ["dynamic/Table", "表格"],
            // ["dynamic/RichText", "富文本编辑器"],
            // ["dynamic/ValidationCountdown", "获取验证码按钮"],
            // ["dynamic/SelectAddress", "省市区"],
          ],
        },
      ],
    },
  },
};
