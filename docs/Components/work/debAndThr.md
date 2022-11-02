# 防抖与节流封装

<ContainerBox title="介绍">
::: slot desc
防抖与节流，解决一些频繁触发的事件，比如input输入，鼠标滚动和滑动等。<br/>
防抖：每间隔一段时间执行一次，如果n秒内高频事件再次被触发，则重新计算时间。<br/>
节流：一段时间内只执行一次，用户点击按钮后,在一段内连续点击只会执行一次事件。
:::
</ContainerBox>

## 代码演示

##### 查看防抖节流演练的同时，请F12打开console控制台查看输出效果

<ContainerBox title="防抖效果展示">
<div class="demoBox">
<static-debAndThr-debounce />
</div>
</ContainerBox>
<ContainerBox title="节流效果展示">
<div class="demoBox">
<static-debAndThr-Throttle />
</div>
</ContainerBox>
