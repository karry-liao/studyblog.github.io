# 瀑布流

<ContainerBox title="介绍">
::: slot desc
根据属性计算来实现页面的布局
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="效果展示">
<div class="demoBox">
<static-Pinterest-demo-Pinterest/>
</div>

<ShowCode>
::: slot codes
```vue
    .box {
          margin: 10px;
          column-count: 3;
          column-gap: 10px;
      }
      .item {
          margin-bottom: 10px;
      }
      .item img{
          width: 100%;
          height:100%;
      }
````
:::
</ShowCode>
</ContainerBox>

<ContainerBox title="瀑布流进阶">
::: slot desc

:::

<div class="demoBox">
<static-Pinterest-demo-waterfall/>
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