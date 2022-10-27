# 行内元素和块级元素

**1、默认情况下，行内元素不会以新的一行开始，而块级元素会新起一行。**

当行内元素在一行内**排不下的时候才会换行**，而且其宽度随着元素的内容而变化。块级元素的则宽度自动填满其父元素宽度。

**2、块级元素可以设置 width, height属性，注意：块级元素即使设置了宽度，仍然是独占一行的。****而行内元素设置width, height无效。**

**3、块级元素可以设置margin 和 padding。**

**行内元素的水平方向的padding-left,padding-right,margin-left,margin-right 都产生边距效果，但是竖直方向的padding-top,padding-bottom,margin-top,margin-bottom都不会产生边距效果。（也就是水平方向有效，竖直方向无效）**

**4、块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素**

比如我们想在`<span>`标签内包含`<div>`标签是不被允许的。而在`<div>`标签中包含`<span>`标签是经常看到的。

**5、设置居中。**

行内元素想要设置水平居中，只需要text-align属性即可。 这里设置的text-align是设置在外层的div当中，评论区有提到，因为上面讲了行内元素设置宽高是无效的，所以我们需要的居中其实是将块级元素当中的行内元素居中。

# 常见的行内元素和块级元素

1、常见的行内元素

```
<span>``<a>``<lable>``<strong>``<b>``<small>``<abbr>``<button>``<input>``<textarea>``<select>``<code>``<img>``<br>``<q>``<i>``<cite>``<var>``<kbd>``<sub>``<bdo>
```

2、常见的块级元素

```<div><p><li><h1><h2><h3><h4><h5><h6><form><header><hr><ol><address><article><aside><audio><canvas><dd><dl><fieldset><section><ul><video>```

# 如何使用CSS来禁止移动端页面的左右划定手势

CSS属性 `touch-action` 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。

```css
html{
 touch-action: none;
 touch-action: pan-y;
}
//还可以直接指定对应元素的宽度和overflow：
html{
 width: 100vw;
 overflow-x: hidden;
}
```

