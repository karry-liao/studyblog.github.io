<template>
  <div>
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

  },

  mounted() {
    this.drawChart();
  },
};
</script>

<style></style>
