<template>
  <div>
    <div id="linechart" style="width: 40vw; height: 40vh"></div>
    <div id="main" style="width: 40vw; height: 40vh"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  name: "Radarechart",
  components: {},
  data() {
    return {
      timer: "",
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = echarts.init(document.getElementById("main"));
      //自适应
      window.onresize = function () {
        //窗口大小
        myChart.resize(); //自适应
      };
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "Proportion of Browsers",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          bottom: 10,
          data: (function () {
            var list = [];
            for (var i = 1; i <= 28; i++) {
              list.push(i + 2000 + "");
            }
            return list;
          })(),
        },
        visualMap: {
          top: "middle",
          right: 10,
          color: ["red", "yellow"],
          calculable: true,
        },
        radar: {
          indicator: [
            { text: "IE8-", max: 400 },
            { text: "IE9+", max: 400 },
            { text: "Safari", max: 400 },
            { text: "Firefox", max: 400 },
            { text: "Chrome", max: 400 },
          ],
        },
        series: (function () {
          var series = [];
          for (var i = 1; i <= 28; i++) {
            series.push({
              type: "radar",
              symbol: "none",
              lineStyle: {
                width: 1,
              },
              emphasis: {
                areaStyle: {
                  color: "rgba(0,250,0,0.3)",
                },
              },
              data: [
                {
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    (i * i) / 2,
                  ],
                  name: i + 2000 + "",
                },
              ],
            });
          }
          return series;
        })(),
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
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
      (this.timer = setInterval(() => {
        var i = parseInt(Math.random() * res.length);
        option.series[0].data = res[i];
        option && myChart.setOption(option);
      }, 2000)),
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        (option = {
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
              type: "line",
            },
          ],
        });
    },
  },

  mounted() {
    this.drawChart();
    this.linechart();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style></style>
