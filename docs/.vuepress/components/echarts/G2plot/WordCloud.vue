<template>
  <div>
    <div id="WordClouds" style="width: 40vw; height: 40vh"></div>
    <div id="WordCloud" style="width: 40vw; height: 40vh"></div>
    <div id="container" style="width: 40vw; height: 40vh"></div>
  </div>
</template>

<script>
import { Line, WordCloud } from "@antv/g2plot";
export default {
  name: "wordcloud",
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    datas() {
      const data = [
        {
          year: "1991",
          value: setInterval(() => {
            return 3 * Math.random().toFixed(0);
          }, 2000),
        },
        { year: "1992", value: 7 },
        { year: "1993", value: 6 },
        { year: "1994", value: 5 },
        { year: "1995", value: 4 },
        { year: "1996", value: 6 },
        { year: "1997", value: 7 },
        { year: "1998", value: 9 },
        { year: "1999", value: 15 },
      ];
      const line = new Line("container", {
        data,
        xField: "year",
        yField: "value",
      });
      // this.isLoading = false;
      line.render();
    },
    wordcloud() {
      fetch(
        "https://gw.alipayobjects.com/os/antfincdn/%24IWXp5slbE/2020-movie-from-douban.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const wordCloud = new WordCloud("WordCloud", {
            data,
            wordField: "title",
            weightField: "rate",
            colorField: "tag",
            legend: {},
            imageMask:
              "https://gw.alipayobjects.com/zos/antfincdn/Qw7Xbn76kM/53176454-747c-4f0a-a9e5-936aa66a0082.png",
            wordStyle: {
              fontFamily: "Avenir",
              fontSize: [8, 16],
            },
            state: {
              active: {
                style: {
                  lineWidth: 0,
                  shadowBlur: 4,
                  shadowColor: "rgba(0,0,0,0.3)",
                },
              },
            },
          });
          wordCloud.render();
        });
    },
    wordclouds() {
      fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const wordCloud = new WordCloud("WordClouds", {
            data,
            wordField: "name",
            weightField: "value",
            colorField: "name",
            wordStyle: {
              fontFamily: "Verdana",
              fontSize: [8, 32],
              rotation: 0,
            },
            // 返回值设置成一个 [0, 1) 区间内的值，
            // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
            random: () => 0.5,
          });

          wordCloud.render();
        });
    },
  },
  mounted() {
    this.datas();
    this.wordcloud();
    this.wordclouds();
  },
};
</script>

<style></style>
