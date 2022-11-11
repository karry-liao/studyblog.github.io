# PC端响应式布局方案

## Flex布局

```html
<div class="app">
  <header class="header">头部</header>
  <div class="container">
    <div class="content">内容</div>
  </div>
  <footer class="footer">底部</footer>
</div>
```

```css
body{ 
  padding: 0;
  margin: 0;
  text-align: center;
}

.app{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.header{
  height: 50px;
  line-height: 50px;
  background-color: aqua;
}

.footer{
  height: 50px;
  line-height: 50px;
  background-color: blueviolet;
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: lightcyan;
}

```

## 媒体查询

- 直接在 css 文件中定义不同屏幕下的样式
- 通过 link 中的媒体查询，不同屏幕引用不同的分辨率

比如我要实现一个 1300px 和 700px 两个不同屏幕下的样式，我可以这样使用媒体查询：

```css
@media screen and (max-width:1300px){
    .home {
    width: 80%;
    font-size: 14px
  }
}
@media screen and (min-width:700px){
    .home {
    width: 100%;
    font-size: 10px
  }
}
```

方式二

```html
<link rel="stylesheet" media="(max-width: 1400px)" href="pc1.css" />
<link rel="stylesheet" media="(max-width: 900px)" href="pc2.css" />
```

## 动态rem/em方案

em 和 rem 都是相对单位，区别在于

- em 根据自身字体大小计算
- rem 根据根节点 html 的字体大小计算（root em），默认是 16 px

```js
function autoResponse(width = 750) {
  const target = document.documentElement
  console.log(target.clientWidth)
  if (target.clientWidth >= 600) {
    target.style.fontSize = '40px'
  } else {
    target.style.fontSize = `${target.clientWidth / width * 100}px`
  }
}

autoResponse()

window.addEventListener('resize', autoResponse)
```

## Viewport 方案

动态 rem / em 方案本质是让页面元素根据屏幕宽度变化等比例缩放，而 CSS 的 Viewport 单位就是相对屏幕宽高的长度单位，常用的 Viewport 单位有四个

vw：viewpoint width，视窗宽度，1vw 相当于 `window.innerWidth` 的 1%

vh：viewpoint height，视窗高度，1vh 相当于 `window.innerHeight` 的 1%

vmin：vw 和 vh 中较小的长度

vmax：vw 和 vh 中较大的长度

在实际开发中，我们可以使用 [postcss-px-to-viewport](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpostcss-px-to-viewport) 这个插件来帮助我们把设计稿的 px 转换成 viewport 单位，这样根据设计稿开发出来的页面可以有很好的响应式效果。另外现在 Viewport 的兼容性支持也非常完善了，这是目前最为推荐响应式方案

## scale 整体缩放

[`scale()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fscale) 可以用来设置 `tranform` 属性的缩放比例，如果只有一个参数，比如 `scale(0.8)`，就是 x 轴和 y 轴同时缩小 80%；如果有两个参数，比如 `scale(0.8，0.9)`，就是 x 轴缩小 80%，y 轴缩小 90%。

为了得到缩放比例我们需要拿当前屏幕的宽高比例（比如：1920 * 1080）和设计稿比例（比如上图的 1440 * 1024）做一个比较

如果当前屏幕宽高比（1920 / 1080）**大于**设计稿宽高比（1440 * 1024），需要缩放的比例就是**屏幕高度除以设计稿高度**（1080 / 1024 = 1.05）

如果当前屏幕宽高比（1200 / 900）**小于**设计稿宽高比（1440 * 1024），需要缩放的比例就是**屏幕宽度除以设计稿宽度**（1200 / 1440 = 0.83）

## 总结

首选 flex 布局方式和 Element 的 row / col 布局，能够很大程度上减少响应式布局的开发工作量

对于一个页面 container 中存在多个展示内容的场景，最好在 container 中定义 Viewport 宽高，组件内部的宽度、高度都设置为 100%，其他几何属性通过 Viewport 定义，这样可以增加组件内部的复用性

对于需要特殊处理的属性可以通过

1. 媒体查询特殊处理样式
2. 监听 `resize` 事件，通过响应式变量修改组件内部样式属性

对于使用 echarts 展示数据的场景，要在浏览器 `resize`事件后手动调用 echarts 的 `resize()` 方法保证图表展示的响应性