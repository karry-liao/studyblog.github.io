# CSS选择器

## `css`属性选择器

| 选择器名                    | 描述                               |
| --------------------------- | ---------------------------------- |
| id选择器（#box）            | 选择id为box的元素                  |
| 类选择器（.one）            | 选择类名为one的所有元素            |
| 标签选择器（div）           | 选择标签为div的所有元素            |
| 后代选择器（#box div）      | 选择id为box元素内部所有的div元素   |
| 子选择器（.one>one_1        | 选择父元素为.one的所有.one_1的元素 |
| 相邻同胞选择器（.one+.two） | 选择紧接在.one之后的所有.two元素   |
| 群组选择器（div,p           | 选择div、p的所有元素               |

### 伪类选择器：

| :link        | 选择未被访问的链接       |
| ------------ | ------------------------ |
| :visited     | 选取已被访问的链接       |
| :active      | 选择活动链接             |
| :hover       | 鼠标指针浮动在上面的元素 |
| :focus       | 选择具有焦点的           |
| :first-child | 父元素的首个子元素       |

### 伪元素选择器：

| :first-letter | 用于选取指定选择器的首字母         |
| ------------- | ---------------------------------- |
| :first-line   | 选取指定选择器的首行               |
| :before       | 选择器在被选元素的内容前面插入内容 |
| :after        | 选择器在被选元素的内容后面插入内容 |

### 属性选择器：

| [attribute]         | 选择带有attribute属性的元素        |
| ------------------- | ---------------------------------- |
| [attribute=value]   | 选择所有使用attribute=value的元素  |
| [attribute~=value]  | 选择attribute属性包含value的元素   |
| [attribute\|=value] | 选择attribute属性以value开头的元素 |

### 在`CSS3`中新增的选择器有如下：

- 层次选择器（p~ul），选择前面有p元素的每个ul元素
- 伪类选择器

| :first-of-type      | 父元素的首个元素                  |
| ------------------- | --------------------------------- |
| :last-of-type       | 父元素的最后一个元素              |
| :only-of-type       | 父元素的特定类型的唯一子元素      |
| :only-child         | 父元素中唯一子元素                |
| :nth-child(n)       | 选择父元素中第N个子元素           |
| :nth-last-of-type(n | 选择父元素中第N个子元素，从后往前 |
| :last-child         | 父元素的最后一个元素              |
| :root               | 设置HTML文档                      |
| :empty              | 指定空的元素                      |
| :enabled            | 选择被禁用元素                    |
| :disabled           | 选择被禁用元素                    |
| :checked            | 选择选中的元素                    |
| :not(selector)      | 选择非 ```<selector>``` 元素的所有元素  |

属性选择器

| [attribute*=value] | 选择attribute属性值包含value的所有元素 |
| ------------------ | -------------------------------------- |
| [attribute^=value] | 选择attribute属性开头为value的所有元素 |
| [attribute$=value] | 选择attribute属性结尾为value的所有元素 |

## 优先级

内联 > ID选择器 > 类选择器 > 标签选择器

### 选择器权重

1、!important，加在样式属性值后，权重值为 10000（这个是最高的权重，所以在非必要情况下切勿加此代码！）

2、内联样式，如：style=””，权重值为1000

3、ID选择器，如：#content，权重值为100

4、类，伪类和属性选择器，如： content、:hover 权重值为10

5、标签选择器和伪元素选择器，如：div、p、:before 权重值为1

6、通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0

## 属性继承

在`css`中，继承是指的是给父元素设置一些属性，后代元素会自动拥有这些属性 关于继承属性，可以分成：

### 字体系列属性：

```css
font:组合字体
font-family:规定元素的字体系列
font-weight:设置字体的粗细
font-size:设置字体的尺寸
font-style:定义字体的风格
font-variant:偏大或偏小的字体
```

### 文本系列属性

```css
text-indent：文本缩进
text-align：文本水平对齐
line-height：行高
word-spacing：增加或减少单词间的空白
letter-spacing：增加或减少字符间的空白
text-transform：控制文本大小写
direction：规定文本的书写方向
color：文本颜色
```

元素可见性

```
visibility
```

### 表格布局属性

```css
caption-side：定位表格标题位置
border-collapse：合并表格边框
border-spacing：设置相邻单元格的边框间的距离
empty-cells：单元格的边框的出现与消失
table-layout：表格的宽度由什么决定
```

### 列表属性

```css
list-style-type：文字前面的小点点样式
list-style-position：小点点位置
list-style：以上的属性可通过这属性集合
```

### 引用

```css
quotes：设置嵌套引用的引号类型
```

### 光标属性

```css
cursor：箭头可以变成需要的形状
```

继承中比较特殊的几点：

- a 标签的字体颜色不能被继承
- h1-h6标签字体的大下也是不能被继承的

## 无继承的属性

- display
- 文本属性：vertical-align、text-decoration
- 盒子模型的属性：宽度、高度、内外边距、边框等
- 背景属性：背景图片、颜色、位置等
- 定位属性：浮动、清除浮动、定位position等
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline-style、outline-width、outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after