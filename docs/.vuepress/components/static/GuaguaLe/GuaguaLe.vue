<template>
  <div style="width: 400px; height: 300px; position: relative">
    <canvas id="canvas" width="400" height="200"> </canvas>
    <div class="price">{{ goods }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: [
        "恭喜你中奖一个亿",
        "恭喜你中奖一套海景房",
        "恭喜你中奖一辆保时捷",
        "恭喜你中奖一辆奥拓",
        "恭喜你中奖一个充气娃娃",
      ],
    };
  },
  computed: {
    goods() {
      let i = parseInt(Math.random() * this.price.length);
      return this.price[i];
    },
  },
  methods: {
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
  },

  mounted() {
    this.canvas();
  },
};
</script>

<style scoped>
#canvas {
  border: 1px solid rgb(199, 198, 198);
}
.price {
  width: 200px;
  height: 100px;
  margin: auto;
  /* z-index: 2; */
  margin-top: -145px;
  color: red;
  font-size: 20px;
  text-align: center;
}
</style>
