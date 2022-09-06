# Button

<ContainerBox title="介绍">
::: slot desc
改变css,实现动画按钮动画效果
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="基础用法">
<div class="demoBox">
<static-Button-demo-Button/>
</div>

<ShowCode>
::: slot codes
```vue
<template>
  <div>
      <button class="button1">边框按钮</button>
  </div>
</template>
<style scoped>
    .button1{
        width: 150px;
        height: 70px;
        background-color: gray;
        border-radius: 10px;
        border-color: brown;
        border: 3px saddlebrown solid;
        color: beige;
        font-size: 30px;
        outline: none;
        z-index: 1;
        position: relative;
        overflow: hidden;
    }
        .button1::before{
        content: "";
        position: absolute;
        background-color: aliceblue;
        width: 200px;
        height: 200px;
        z-index: -2;
        left: 50%;
        top: 50%;
        transform-origin: 0 0;
        animation: rotate 3s infinite linear;
    }
        .button1::after{
        content: "";
        position: absolute;
        background: seagreen;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        left: 2px;
        top: 2px;
        border-radius: 10px;
        z-index: -1;
    }
        @keyframes rotate {
        to{
            transform: rotate(1turn);
        }

    }
</style>
````
:::
</ShowCode>
</ContainerBox>

<ContainerBox title="自定义样式">
::: slot desc

:::

<div class="demoBox">
<static-Button-demo-Button ButtonName="这是自定义内容" color="#FFFFFF"/>
</div>

<ShowCode>
::: slot codes
```vue
<div class="demo">
    <static-Button-demo-Button ButtonName="这是自定义内容" color="#FFFFFF"/>
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
| ButtonName                         | 按钮显示名字         | String   | 可自定义内容      |
| color                    | 字体颜色 | String   | #ffff00      |


:::
</ContainerBox>