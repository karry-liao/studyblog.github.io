<template>
  <div id="gauge"></div>
</template>

<script>
import { Gauge } from "@antv/g2plot";
export default {
  methods: {
    gauge() {
      const color = ["#000000", "#FAAD14", "#30BF78"];
      const getColor = (percent) => {
        return percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
      };
      const gauge = new Gauge("gauge", {
        percent: 0.2,
        range: {
          color: getColor(0.2),
        },
        indicator: {
          pointer: {
            style: {
              stroke: "#D0D0D0",
            },
          },
          pin: {
            style: {
              stroke: "#D0D0D0",
            },
          },
        },
        axis: {
          label: {
            formatter(v) {
              return Number(v) * 100;
            },
          },
          subTickLine: {
            count: 3,
          },
        },
        statistic: {
          content: {
            formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
          },
          style: {
            fontSize: 60,
          },
        },
        animation: false,
      });

      gauge.render();

      let data = 0.2;
      const interval = setInterval(() => {
        if (data >= 0.85) {
          clearInterval(interval);
        } else {
          data += 0.01;
          gauge.changeData(data);
          gauge.update({ range: { color: getColor(data) } });
        }
      }, 100);
    },
  },
  mounted() {
    this.gauge();
  },
};
</script>

<style></style>
