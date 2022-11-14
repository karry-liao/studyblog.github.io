# HTML

## 1. 捕获属性打开你的设备摄像头

正如 input 标记具有 email、 text 和 password 属性一样，还有一个属性可以打开移动设备的摄像头来捕捉图像。

这是通过 capture 属性完成的，该属性可以有两个值:

- 前置摄像头用户
- 后置摄像头的环境

```js
<input type="file" capture="user" accept="image/*">
```

## 2. 网站自动刷新

```js
//这个片段每10秒刷新一次网站
<head>
    <meta http-equiv="refresh" content="5">
</head>
```

## 3. 激活拼写检查

```html
<input type="text" spellcheck="true" lang="en">
```

## 4. 指定要上传的文件类型

```html
<input type="file" accept=".jpeg,.png">
```

## 5. 防止翻译

```html
<p translate="no">Brand name</p>
```

## 6. 在 input 标签中输入多个条目

这可以通过多个属性来完成

```html
<input type="file" multiple>
复制代码
```

它适用于文件和电子邮件。对于电子邮件，用逗号分隔每封电子邮件。

## 7. 为你的视频创建一个海报(缩略图)

通过海报属性，您可以创建一个图像，该图像在视频下载时显示，或者直到用户点击播放按钮。

如果不包括这一点，视频的第一帧将被替代使用。

```html
<video poster="picture.png"></video>
```

## 8. 点击链接自动下载

如果希望在单击指向目标资源的链接时下载特定资源，请添加 download 属性

```html
<a href="image.png" download>
```

# css

### 1. 自定义光标（cursor）

首先来看一下`CSS`的内置光标样式。平时开发中用到的基本上就是`default`、`pointer`、`not-allowed`、`move`这几个。其实内置的光标样式还有很多，大家可以把鼠标放到下面的颜色块上体验一下。

自定义光标也很简单，只需要通过`cursor: url(xxx)`引入一张图片即可。有时候我们下载的`chrome`主题会改变光标的样式，用的就是这个方法。

```css
.auto {
    cursor: auto | default | none | context | menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | all-scroll | col-resize |row-resize | n-resize | e-resize | s-resize | w-resize |ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize| nesw-resize|nwse-resize|zoom-in|zoom-out;
  }
  .image {
    cursor: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/happy.png"), auto;
}
```

### 2. 自定义插入光标颜色（caret-color）

一般的交互情况下，如果用户输入错误，输入框的颜色会变成红色的。这时我们可以通过`caret-color`这个属性把插入光标也变成红色的。如果不想要展示这个插入光标，可以将`caret-color`设置为`transparent`。

### 3. 自定义placeholder样式（::placeholder）

还拿输入框校验失败的例子来说，如果一个输入框是必填的，如果没有输入具体值，在失焦的情况下一般都会标红提示。这时候也可以把`placeholder`变成红色的达到更加醒目的效果。

### 4. 自定义选中样式（::selection）

有时候我们看到网页的文字选中会有特殊的样式，就是通过`::selection`这个伪元素来实现的。

`::selection`伪元素用来应用于文档中被用户高亮的部分。在使用这个伪元素时，有一点需要注意，只有以下这些`CSS`属性可以用于`::selection` 选择器：

- [`color`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fcolor)
- [`background-color`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fbackground-color)
- [`cursor`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fcursor)
- [`caret-color`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fcaret-color)
- [`outline`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Foutline)
- [`text-decoration`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Ftext-decoration)
- [`text-emphasis-color` (en-US)](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ftext-emphasis-color)
- [`text-shadow`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Ftext-shadow)

### 5. 禁止用户选择 & 可以整段选择（user-select）

有些网站会禁止用户选中内容进行复制，在CSS层面可以通过`user-select: none`来实现。

`user-select`属性用来控制用户能否选中文本。它可以接收的参数还有`auto`、`text`、`contain`、`all`等。

当为`all`时，当点击子元素或者上下文时，包含该子元素的最顶层元素也会被选中。有了这个属性，我们在复制整篇内容时，不用先选中然后通过拖动滚动条来实现复制大段的内容了，可以通过先找到想要复制的元素的根元素，然后给它加上`user-select: all`的属性，就可以轻松的点击一下就全部选中了。

### 6. 禁止鼠标事件（pointer-events）

在有些需求中，需要禁止用户点击某个区域，看起来鼠标在这个区域完全不起作用，不会响应相应的事件。这时候可以通过`pointer-events`属性来限制。

`pointer-events`属性用来指定在什么情况下某个特定的图形元素可以成为鼠标事件的`target`。把它设置成`none`即可到达效果。

### 7. 让网站变灰（filter:grayscale）

在一些公祭日的时候，我们浏览网站通常都会发现网站整体风格都会变成灰色的。这种效果就是用`filter`这个属性实现的。

`filter`属性可以将模糊或颜色偏移等图形效果应用于元素，可以接收的函数包括：

- [`blur()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fblur)、
- [`brightness()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fbrightness)
- [`contrast()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fcontrast)
- [`grayscale()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fgrayscale)
- [`hue-rotate()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fhue-rotate)
- [`invert()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Finvert)
- [`opacity()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fopacity)
- [`saturate()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fsaturate)
- [`sepia()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fsepia)
- [`drop-shadow()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffilter-function%2Fdrop-shadow)

### 8. 首字母大写（::first-letter）

在排版中我们经常能看到首字母大写的效果。这种效果可以使用`::first-letter`这个伪元素来实现。

`::first-letter`会选中某块级元素第一行的第一个字母。要注意必须为块级元素，也就是说只有在`display`属性值为`block`、`inline-block`、`table-cell`、`list-item`或`table-caption`的元素上才起作用。其他情况下将没有效果。

### 9. 多行文本截断展示省略号(-webkit-line-clamp)

在工作中经常会遇到容器宽度不够的情况下要截断文本的情况。单行文本截断展示省略号的方法估计大家已经应用的很是得心应手了。

```css
white-space: nowrap; 
overflow: hidden; 
text-overflow: ellipsis;
复制代码
```

下面来看看多行文本截断展示的情况。`-webkit-line-clamp`该派上用场了。

`-webkit-line-clamp`属性可以把块容器中的内容限制为指定的行数。它只有在`display`属性设置成`-webkit-box`或者`-webkit-inline-box`并且`-webkit-box-orient`属性设置成`vertical`时才有效果。再配合上`overflow: hidden`和`text-overflow: ellipsis`就可以实现多行文本截断展示省略号的效果了。

### 10. 中文简体繁体相互转换（font-variant-east-asian）

`font-variant-east-asian`这个属性可以实现中文简体繁体的相互转换。但使用它达到效果是有条件的，需要字体本身就包含繁体变体。苹果设备的默认中文字体中一般都包含繁体字体。

### 11. 实现镜像、倒影等效果（-webkit-box-reflect）

`-webkit-box-reflect`这个属性可以在不同方向反射元素的内容。有了这个属性，我们就可以实现一些神奇的效果，比如镜像、倒影等。

```css

.left {
  -webkit-box-reflect:right
}

.below {
  -webkit-box-reflect:below
}
```

