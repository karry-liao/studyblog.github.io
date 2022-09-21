const path = require("path");
console.log(path.resolve(__dirname, "./components")),
  (module.exports = {
    title: "芒梨博客", //标题
    keywords: "前端开发",
    description: "个人博客",
    repo: "git@github.com:karry-liao/studyblog.github.io.git", //仓库地址
    base: "/studyblog.github.io/",
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    lastUpdated: "Last Updated",
    configureWebpack: {
      node: {
        global: true,
      },
    },
    plugins: [
      [
        // 先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
        "@vuepress-reco/vuepress-plugin-kan-ban-niang",
        {
          theme: ["wanko"],
          clean: true,
          messages: {
            welcome: "欢迎你的关注 ",
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
      [
        "@vuepress/plugin-register-components",
        {
          componentsDir: path.resolve(__dirname, "./components"),
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
        { text: "数据可视化", link: "/Components/Echarts/echarts" },
        { text: "JS", link: "/Components/javascript/base" },
        { text: "Vue", link: "/Components/vue/base" },
        {
          text: "计算机网络知识",
          link: "/Components/CpNet/base",
        },
        {
          text: "面试总结",
          link: "/Components/md_interview/interview",
        },
        {
          text: "语言",
          ariLabel: "2021",
          items: [
            //多级导航栏
            { text: "中文", link: "/language/chinese/" },
            { text: "英文", link: "/language/english/" },
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
              ["base/introduce", "介绍"],
              // ["base/start", "快速开始"],
            ],
          },
          {
            title: "HTML&CSS篇",
            collapsable: false,
            children: [
              ["htmlcss/Flex", "Flex布局"],
              ["htmlcss/FontCss", "花式字体"],
              // ["base/start", "快速开始"],
            ],
          },
          {
            title: "Vue组件篇",
            collapsable: false,
            children: [
              ["static/GuaguaLe", "canvas之刮刮乐"],
              ["static/Pinterest", "瀑布流"],
              ["static/Icon", "图标"],
              ["static/Button", "光亮按钮"],
              ["static/Message", "信息提醒框"],
              ["static/MagnifyingGlass", "放大镜效果"],
              ["static/SlideVerify", "滑块验证"],
            ],
          },
          {
            title: "JavaScript篇",
            collapsable: true,
            children: [
              ["javascript/base", "JS基础"],
              ["javascript/clone", "浅拷贝与深拷贝"],
              ["javascript/ESsix", "ES6新拓展"],
              ["javascript/extends", "JavaScript扩展"],
              ["javascript/designPatterns", "JS常见设计模式"],
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
          {
            title: "Vue篇",
            collapsable: true,
            children: [
              ["vue/base", "Vue基础"],
              ["vue/code", "Vue源码分析"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "React篇",
            collapsable: true,
            children: [
              ["react/base", "初识React"],
              ["react/Reacthooks", "常用ReactHooks"],
              ["react/ReactPerfomance", "React性能提升"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "NodeJS篇",
            collapsable: true,
            children: [
              ["NodeJs/Start", "初识NodeJS"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "Web性能提升篇",
            collapsable: true,
            children: [
              ["performance/Browser", "Web缓存"],
              ["performance/WebWorker", "WebWorker"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "MiniPrograme篇",
            collapsable: true,
            children: [
              ["MiniPrograme/base", "初识小程序"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "Java基础篇",
            collapsable: true,
            children: [
              // ["static/Icon", "图标"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "计算机网络知识篇",
            collapsable: true,
            children: [
              ["CpNet/base", "计算机网络基础"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
          {
            title: "数据结构与算法篇",
            collapsable: true,
            children: [
              ["dataStructureAndCount/count", "算法"],
              // ["static/Svg", "SVG变色图标"],
            ],
          },
        ],
      },
    },
  });
