# Button

<ContainerBox title="介绍">
::: slot desc
使用canvas做刮刮乐中奖效果
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="基础用法">
<div class="demoBox">
<static-GuaguaLe-GuaguaLe/>
</div>

<ShowCode>
::: slot codes
```vue
<script>
    canvas() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.lineWidth = 3; //现宽
      ctx.strokeStyle = "red"; //颜色
      //   ctx.moveTo(10, 10);
      //   ctx.lineTo(100, 10);
      //   ctx.lineTo(200, 200);
      //   ctx.stroke(); //执行
      //   canvas.onmousemove = function (e) {
      //     console.log(e);
      //     ctx.lineTo(e.offsetX, e.offsetY);
      //     ctx.stroke();
      //   };
      ctx.rect(0, 0, 400, 200); //左上角X,Y width，height
      ctx.fillStyle = "#ccc"; //填充颜色
      ctx.fill(); //执行填充
      canvas.onmousedown = function () {
        canvas.onmousemove = function (e) {
          ctx.clearRect(e.offsetX, e.offsetY, 25, 25); //刮掉颜色
        };
      };
      canvas.onmouseup = function () {
        canvas.onmousemove = null; //清除事件
      };
    },
    </script>
````
:::
</ShowCode>
</ContainerBox>

## API
