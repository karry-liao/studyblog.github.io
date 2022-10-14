## 前端实现动画的几种方式

前端常用的动画实现方式有以下种：

1. css3的`transition` 属性
2. css3的`animation` 属性
3. 原生JS动画
4. 使用`canvas`绘制动画
5. SVG动画
6. Jquery的`animate`函数
7. 使用gif图片

### 1. css3的`transition`

`transition`属性：

用来设置样式的属性值是如何从一种状态平滑过渡到另外一种状态

```css
transition: property duration timing-function delay;
```

`transition`是一种简写属性,它可以拆分为四个过渡属性。你可以 `transition: 值1，值2，值3，值4` 这样写，也可以：`transition-property: 值1;`，`transition-duration:值2;`，`transition-timing-function:值2;`，`transition-delay:值4;`这样写。

| 值                         | 描述                                |
| -------------------------- | ----------------------------------- |
| transition-property        | 规定设置过渡效果的 CSS 属性的名称。 |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒。  |
| transition-timing-function | 规定速度效果的速度曲线。            |
| transition-delay           | 定义过渡效果何时开始。              |

```css
div{
  width:50px;
  height: 50px;
  background-color: pink;
  transition: 1s;
}
div:hover{
  width:200px;
}
```

```
transition`属性默认为：`transition: all 0 ease 0;
transition:1s;` 等价于 `transition: all 1s ease 0;
```

### 2. css3的`animation`

`animation`属性：比较类似于 flash 中的逐帧动画。学习过 `flash`的同学知道，这种逐帧动画是由关键帧组成，很多个关键帧连续的播放就组成了动画在 `CSS3` 中是由属性`keyframes`来完成逐帧动画的。

`animation`属性与`transition`属性的区别：

- `transition`只需指定动画的开始和结束状态，整个动画的过程是由特定的函数控制,你不用管它。
- `animation`可以对动画过程中的各个关键帧进行设置

```css
div{
    width:50px;
    height:50px;
    background-color: pink;
}
div:hover{
    animation: change1 5s;
}
@keyframes change1{
    25%  {width:130px;background-color: red;}
    50%  {width:170px;background-color: blue;}
    75%  {width:210px;background-color: green;}
    100% {width:250px;background-color: yellow;}
}
```

### 3. 原生`JS`动画

其主要思想是通过setInterval或setTimeout方法的回调函数来持续调用改变某个元素的CSS样式以达到元素样式变化的效果。

javascript 实现动画通常会导致页面频繁性重排重绘，消耗性能，一般应该在桌面端浏览器。在移动端上使用会有明显的卡顿。

### 总结：

- **代码复杂度方面**简单动画：`css`代码实现会简单一些，`js`复杂一些。 复杂动画的话：`css`代码就会变得冗长，`js`实现起来更优。
- **动画运行时，对动画的控制程度上** `js` 比较灵活，能控制动画暂停，取消，终止等`css`动画不能添加事件，只能设置固定节点进行什么样的过渡动画。
- **兼容方面** `css` 有浏览器兼容问题`js`大多情况下是没有的。
- **性能方面** `css`动画相对于优一些，`css` 动画通过`GUI`解析`js`动画需要经过`js`引擎代码解析，然后再进行 `GUI` 解析渲染。