<template>
  <div class="sudoku-container">
    <section>
      <sudoluWrap @change="lotteryChange" :awardList="awardList"></sudoluWrap>
    </section>
  </div>
</template>

<script>
import sudoluWrap from "./components/Comsudolu.vue";
import coupon from "./assets/img/sudoku/coupon.png";
export default {
  data() {
    return {
      awardList: [],
    };
  },
  created() {
    this.initWard();
  },
  methods: {
    initWard() {
      // 模拟异步数据
      setTimeout(() => {
        this.awardList = [
          {
            name: "10点券",
            prize_img: coupon,
            prize_id: "c10",
            order: 1,
          },
          {
            name: "200点券",
            prize_img: coupon,
            prize_id: "c20",
            order: 2,
          },
          {
            name: "500点券",
            prize_img: coupon,
            prize_id: "c30",
            order: 3,
          },
          {
            name: "1000点券",
            prize_img: coupon,
            prize_id: "c40",
            order: 4,
          },
          {
            name: "10000点券",
            prize_img: coupon,
            prize_id: "c50",
            order: 5,
          },
          {
            name: "100000点券",
            prize_img: coupon,
            prize_id: "c60",
            order: 6,
          },
          {
            name: "200000点券",
            prize_img: coupon,
            prize_id: "c70",
            order: 7,
          },
          {
            name: "500000点券",
            prize_img: coupon,
            prize_id: "c80",
            order: 8,
          },
        ];
      }, 0);
    },
    lotteryChange(action, item) {
      // start fin 的行为反馈
      console.log(action, item);
    },
  },
  components: { sudoluWrap },
};
</script>
<style lang="less" scoped>
@import url("./assets/reset.css");
.sudoku-container {
  width: 30vw;
  height: 30vh;
  display: inline-block;
  section {
    width: 17rem;
    height: 17rem;
    margin: 0 auto;
    margin-top: 1.28rem;
  }
}
</style>
