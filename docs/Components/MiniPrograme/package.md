# 解决小程序打包上线包体过大导致失败的问题

静态资源优化：将本地图片引用改为在线引入。

分包：```'Optimization':{subPackages：true}```

subPackages:[{

​	"root":"sub_pages"

​	"pages":[ {

​	"path":"index/index"

​	}]

}]

组件css文件移动到APP.vue