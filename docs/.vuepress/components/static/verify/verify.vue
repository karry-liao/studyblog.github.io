<template>
  <div>
      <el-button :type="buttonType" @click="sendCode()" :disabled="isDisabled">{{value}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 60,
      value: "免费获取验证码",
      isDisabled: false,
    };
    },
    computed: {
        buttonType() { 
            return this.isDisabled ? 'info' : 'primary'
        }
    },
  methods: {
    async sendCode() {
      try {
        this.countdown--;
        this.isDisabled = true;
        this.value = `${this.countdown}s 后重新发送`;
          let timer = setInterval(()=>{
          if (this.countdown > 1) {
              this.countdown--;
            this.value = `${this.countdown}s 后重新发送`;
          } else {
            clearInterval(timer);
            this.value = "获取验证码";
            this.isDisabled = false;
            this.countdown = 60;
          }
        }, 1000);
      } catch (res) {
        console.log(res);
      }
    },
  },
};
</script>

<style></style>
