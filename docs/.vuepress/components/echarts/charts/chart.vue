<template>
  <div>
    <div id="linechart" style="width: 40vw; height: 40vh"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  name: "linechart",
  components: {},
  data() {
    return {
      timer: "",
    };
  },
  methods: {
    linechart() {
      var chartDom = document.getElementById("linechart");
      var myChart = echarts.init(chartDom);
      var option;
      let res = [
        [150, 230, 24, 18, 35, 147, 260],
        [5, 230, 224, 218, 135, 147, 20],
        [150, 30, 24, 28, 15, 147, 260],
        [10, 20, 224, 218, 15, 17, 20],
      ];
      window.onresize = function () {
        //窗口大小
        myChart.resize(); //自适应
      };
      myChart.showLoading({
        text: "loading",
        color: "rgb(99, 99, 227)",
        textColor: "rgb(99, 99, 227)",
        maskColor: "rgba(255, 255, 255, 0.2)",
        zlevel: 0,
      });
      this.timer = setInterval(() => {
        var i = parseInt(Math.random() * res.length);
        option.series[0].data = res[i];
        option && myChart.setOption(option);
        myChart.hideLoading();
      }, 2000);

      // console.log(this.isLoding);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        title: {
          text: "可根据请求数据实时动态变化的chart图",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
    },
  },

  mounted() {
    this.linechart();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style></style>
