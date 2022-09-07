## 一、Flex布局表示弹性布局，为盒模型提供最大灵活性。

- ​	webkit内核浏览器，需要加上 -webkit前缀。
- ​    在父级元素设置为flex布局后，子元素的float，clear，vertical-align属性失效

## 二、flex 容器的一些属性

### 		**1.flex-direction** 

​			**设置容器主轴的方向**

​				flex-direction:row | row-reverse | column | 		column=reverse;
​					row：【默认】表示沿水平方向，由左到右。
​					row-reverse ：表示沿水平方向，由右到左。
​					column：表示垂直方向，由上到下。
​					column-reverse:表示垂直方向，由下到上

### 		2.flex-wrap	

​			**用于设置当项目在容器中一行无法显示的时候如何处理。**

​				flex-wrap:nowrap | wrap | wrap-reverse;
​					nowrap：表示不换行。
​					wrap：正常换行，第一个位于第一行的第一个。
​					wrap-reverse：向上换行，第一行位于下方。

### 		3.flex-flow	

​			flex-deriction和flex-wrap属性的简写，默认值为[row nowrap];

### 		**4.justify-content**	

​			**用于设置项目在容器中的对齐方式。**

​			justify-content: flex-start | flex-end | center |space-between | space-around

​				flex-start：【默认】，左对齐
​				flex-end：右对齐。
​				center：居中对齐。
​				space-between：两端对齐。
​				space-around：每个项目两侧的间距相等。

### 		5.align-items

​			align-items:flex-start | flex-end | center | baseline | stretch
​				flex-start:交叉轴的起点对齐。
​				flex-end 交叉轴的终点对齐。
​				center 交叉轴居中对齐。
​				baseline 项目的第一行文字的基线对齐。
​				stretch：【默认】：如果项目未设置高度或者高度为auto，将占满整个容器的高度

###   	6.align-content

​		只适用多行的flex容器（也就是flex容器中的子项不止一行时该属性才有效果），它的作用是当flex容器在交叉轴上有多余的空间时，将子项作为一个整体（属性值为：flex-start、flex-end、center时）进行对齐。

### 		7.order 属性	

​		 **设置项目排序的位置，默认值为0，数值越小越靠前**

​		order:```<Integer>```;

###         8.flex-grow 属性	

​		 用来控制当前项目是否放大显示。默认值为0，表示即使容器有剩余空间也不放大显示。如果设置为1，则平均分摊后放大显示。

​	flex-grow:2;

### 		9.flex-shrink 属性 

​		表示元素的缩小比例。默认值为1，如果空间不够用时所有的项目同比缩小。如果一个项目的该属性设置为0，则空间不足时该项目也不缩小。

### 		10.flex-basis

​		 表示项目占据主轴空间的值。默认为auto，表示项目当前默认的大小。如果设置为一个固定的值，则该项目在容器中占据固定的大小。

### 		11.flex

​		表示flex-grow属性、flex-shrink属性、flex-basis属性的简写。默认值为：0 1 auto；

​		flex:(0 1 auto) | auto(1 1 auto) | none (0 0 auto)

### 	     12.align-self属性

​		表示当前项目可以和其他项目拥有不一样的对齐方式。

​		align-self: flex-start | flex-end | center | baseline | stretch 

