<template>
  <div class="dial-container">
    <dialWrap ref="dialWrap" :stateData="stateData"></dialWrap>
  </div>
</template>

<script>
import dialWrap from "./components/dial.vue";
import prizeImg from "./assets/img/dial/dial.png";
export default {
  data() {
    return {
      stateData: {
        coin: 30,
        prize_img: prizeImg,
      },
    };
  },
  components: {
    dialWrap,
  },
  methods: {
    startClick() {},
  },
  props: {
    awardList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./assets/reset.css");
.dial-container {
  background: url(./assets/img/dial/home-bg.png) no-repeat, rgb(255, 107, 5);
  width: 40vw;
  background-size: cover;
  display: inline-block;
  overflow: hidden;
}
</style>
