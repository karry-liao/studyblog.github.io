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
          items: [
            //多级导航栏
            { text: "常见总结", link: "/Components/md_interview/interview" },
            { text: "Vue", link: "/Components/md_interview/Vue" },
          ],
        },
        {
          text: "ThreeJS",
          ariLabel: "2021",
          items: [
            //多级导航栏
            { text: "中文", link: "/Components/ThreeJS/Lamborghini" },
          ],
        },
        {
          text: "github",
          link: "https://github.com/karry-liao?tab=repositories",
        },
      ],
      sidebar: {
        //侧边拦
        "/Components/": [
          {
            title: "开发指南",
            collapsable: false,
            children: [
              ["base/introduce", "介绍"],
              ["base/Reg", "正则表达式"],
              ["base/Reg", "Map和Set的区别"],
              // ["base/start", "快速开始"],
            ],
          },
          {
            title: "HTML&CSS篇",
            collapsable: false,
            children: [
              ["htmlcss/HtmlsCSS", "HTML&CSS"],
              ["htmlcss/AutoResize", "响应式布局方案"],
              ["htmlcss/CSS", "CSS样式"],
              ["htmlcss/Selector", "CSS选择器"],
              ["htmlcss/Flex", "Flex布局"],
              ["htmlcss/animation", "前端动画"],
              ["htmlcss/FontCss", "花式字体"],
            ],
          },
          {
            title: "Vue组件篇",
            collapsable: false,
            children: [
              ["static/IconStyle", "IconStyle"],
              ["static/GuaguaLe", "canvas之刮刮乐"],
              ["static/LuckyRolling", "幸运大转盘"],
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
              ["javascript/handCode", "前端常见手写代码"],
              ["javascript/APLCode", "JS单行实用代码"],
              ["javascript/base", "JS基础"],
              ["javascript/TypeError", "JavaScript的错误类型"],
              ["javascript/Array", "数组的常用方法"],
              ["javascript/clone", "浅拷贝与深拷贝"],
              ["javascript/ESsix", "ES6新拓展"],
              ["javascript/AST", "抽象语法树"],
              ["javascript/extends", "JavaScript扩展"],
              ["javascript/designPatterns", "JS常见设计模式"],
              ["javascript/fileUpload", "大文件分块上传"],
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
              ["vue/permissionControl", "前端权限控制"],
              ["vue/directive", "Vue自定义指令"],
              ["vue/template", "Ajax失败重连&Fn柯里化&Render"],
              ["vue/vuex", "Vuex状态管理"],
              ["vue/FirstLoad", "首屏加载优化"],
              ["vue/mixin", "VueMixin混入"],
              ["vue/innerComponents", "Vue内置组件"],
              ["vue/Vuethree", "Vue3.0"],
              ["vue/Axios", "Axios"],
              ["vue/code", "Vue源码分析"],
            ],
          },
          {
            title: "WebPack篇",
            collapsable: true,
            children: [
              ["WebPack/webpack", "WebPack"],
              ["WebPack/LoaderAndPlugin", "LoaderAndPlugin"],
              ["WebPack/sourcemap", "sourcemap"],
              ["WebPack/WebPackDevServer", "WebPackDevServer"],
              ["WebPack/TreeShaking", "TreeShaking"],
            ],
          },
          {
            title: "React篇",
            collapsable: true,
            children: [
              ["react/base", "初识React"],
              ["react/Reacthooks", "常用ReactHooks"],
              ["react/ReactPerfomance", "React性能提升"],
            ],
          },
          {
            title: "业务功能篇",
            collapsable: true,
            children: [
              ["work/MessagePush", "实时消息推送的几种方式"],
              ["work/Scan", "扫码登录"],
              ["work/WebSocket", "WebSocket"],
              ["work/SendeCode", "验证码发送倒计时"],
              ["work/debAndThr", "防抖与节流"],
              ["work/eventTraking", "数据埋点"],
              ["work/pay", "支付功能"],
            ],
          },
          {
            title: "NodeJS篇",
            collapsable: true,
            children: [
              ["NodeJs/Node", "NodeJS网络编程"],
              ["NodeJs/Start", "初识NodeJS"],
            ],
          },
          {
            title: "Web性能提升篇",
            collapsable: true,
            children: [
              ["performance/ServiceWorker", "ServiceWorker"],
              ["performance/Performance", "图片懒加载"],
              ["performance/BorserPerformance", "前端性能监控"],
              ["performance/Browser", "Web缓存"],
              ["performance/WebWorker", "WebWorker"],
            ],
          },
          {
            title: "MiniPrograme篇",
            collapsable: true,
            children: [
              ["MiniPrograme/base", "初识小程序"],
              ["MiniPrograme/package", "小程序打包体积问题"],
              ["MiniPrograme/delay", "移动端事件延时"],
            ],
          },
          {
            title: "Java基础篇",
            collapsable: true,
            children: [
              // ["static/Icon", "图标"],
            ],
          },
          {
            title: "计算机网络知识篇",
            collapsable: true,
            children: [["CpNet/base", "计算机网络基础"]],
          },
          {
            title: "数据结构与算法篇",
            collapsable: true,
            children: [
              ["dataStructureAndCount/DoCode", "编程"],
              ["dataStructureAndCount/count", "算法"],
              ["dataStructureAndCount/StackAndHeap", "堆与栈"],
            ],
          },
        ],
      },
    },
  });
