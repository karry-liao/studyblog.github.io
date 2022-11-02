<template>
  <div><input @input="input()" /></div>
</template>

<script>
import { debounce, throttle } from "./debAndThr";
export default {
  data() {
    return {};
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.throttleTest(i);
      this.debounceTest(i);
    }
  },
  methods: {
    input:throttle(() => {
      console.log("每2s内只执行一次");
    }, 2000),
    // 防抖函数测试，由于并发执行了100次所以仅执行最后一次，前面的执行均被防抖掉了
    // 打印结果为 debounce 99
      debounceTest: debounce((i) => {
      console.log("debounce", i);
    }, 2000),
    // 节流函数测试，由于并发执行了100次所以仅执行了第一次，后续的被节流掉了
    // 打印结果为 throttle 0
    throttleTest: throttle((i) => {
      console.log("throttle", i);
    }, 2000),
  },
};
</script>

<style></style>
