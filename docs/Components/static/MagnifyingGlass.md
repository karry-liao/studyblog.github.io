# Icon

<ContainerBox title="介绍">
::: slot desc
此组件常用于购物，放大镜效果，查看图片细节，多用于购物app中。
:::
</ContainerBox>


## 代码演示

<ContainerBox title="基础用法">
<div class="demoBox">
    <static-MagnifyingGlass-demo-magnifyingGlass/>
</div>

<ShowCode>
::: slot codes
```vue
<template>
  <div class="demo">
    爱
    <LibIcon
      :imgUrl="require('./img/love.svg')"
      title="爱心"
      size="10vw"
      left="0.5em"
      right="0.5em"
    />心
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 7.5vw;
}
</style>
````
:::
</ShowCode>
</ContainerBox>

<ContainerBox title="自定义样式">
::: slot desc
悬浮切换图标
:::

<div class="demoBox">
    <!-- <static-MagnifyingGlass-demo-MagnifyingGlass/> -->
</div>

<ShowCode>
::: slot codes
```vue
<div class="demo">
  

</div>
````

:::
</ShowCode>
</ContainerBox>

## API

<ContainerBox title="Props">
::: slot desc

| 参数                           | 说明                                              | 类型   | 默认值 |
| ------------------------------ | ------------------------------------------------- | ------ | ------ |
| imgUrl                         | 图标，引入本地图片请使用`require('路径')`         | 未知   | -      |
| imgUrlHover                    | 悬浮后的图标，引入本地图片请使用`require('路径')` | 未知   | -      |
| title                          | 悬浮提示                                          | String | -      |
| size                           | 图标大小                                          | String | 25px   |
| top \| left \| bottom \| right | 图标外边距                                        | String | 0px    |

:::
</ContainerBox>
