<template>
  <div class="sudoku-wrap">
    <ul>
      <li
        :ref="`item${val.order}`"
        :data-index="val.order"
        :class="val.order >= 1 ? 'rw' : ''"
        v-for="val in resultList"
        :key="val.prize_id"
      >
        <div v-if="val.order !== -9">
          <div class="header"><img :src="val.prize_img" alt="" /></div>
          <div class="name">{{ val.name }}</div>
        </div>
        <div v-else class="start" @click.stop.prevent="startGo"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    awardList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    awardList(val, oldval) {
      // 处理 最终的列表渲染顺序 已正常的排序思维顺序
      const keyObj = {};
      const arr = [];
      const downArr = Object.assign([], val);
      if (downArr.length) {
        downArr.push({ order: -9 });
        downArr.forEach((element) => {
          keyObj[element.order] = element;
        });
        // 依据数组的顺序填充
        this.orderList.forEach((ele) => {
          arr.push(keyObj[ele]);
        });
      }
      this.resultList = arr;
    },
  },
  data() {
    return {
      resultList: [], // 奖品列表
      isTurn: true, // 是否可以抽奖
      index: 1, //当前转动到哪个位置，起点位置
      orderList: [1, 2, 3, 8, -9, 4, 7, 6, 5], // 正常循环排列下的顺序 0 为中间的抽奖按钮/分区标识
      lotterywin: -9, // 中奖位置
      lottery: {
        count: 8, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 35, //初始转动速度
        times: 0, //转动次数
        cynum: 50, // 圈数
        win: 0, //中奖位置 0 默认不中奖
      },
    };
  },
  methods: {
    startGo() {
      if (!this.isTurn) return;
      this.isTurn = false; // 等待下一次开启 注：接口失败等异常情况 需要重置
      // await api 获取中奖信息 （因为数据结构的定义，这里拿到中奖位置将变得非常 esay）
      let win = Math.ceil(Math.random() * this.awardList.length); // 中奖位置
      if (!win) return;
      this.$emit("change", "start", { msg: "转起来了" });
      this.lotterywin = win;
      this._rolling();
    },
    resetData() {
      // 数据重置
      this.index = 1;
      this.isTurn = true;
      this.lottery = {
        count: 8, // 位置数量 九宫格八个奖品位置
        timer: 0, // setTimeout 容器
        speed: 35, //初始转动速度
        times: 0, //转动次数
        cynum: 50, // 圈数
        end: 0, //中奖位置 0 默认不中奖
      };
    },
    _roll_actived() {
      // running 选中的状态
      let pre = this.index - 1;
      if (this.index > this.lottery.count) this.index = 1;
      const preDom = this.$refs["item" + pre];
      const downDom = this.$refs["item" + this.index];
      if (pre > 0 && preDom) {
        preDom[0].classList.remove("active");
      }
      if (downDom) {
        downDom[0].classList.add("active");
      }
    },
    _rolling() {
      this.lottery.times++;
      this._roll_actived();
      // +10 将速度降下来的圈数周期
      if (
        this.lottery.times > this.lottery.cynum + 10 &&
        this.lotterywin === this.index
      ) {
        clearTimeout(this.lottery.timer);
        setTimeout(() => {
          this.resetData();
          this.$emit("change", "fin", {});
          alert(`恭喜你获得:${this.awardList[this.lotterywin - 1].name}`);
        }, 1000); // 此时间给予用户感受中奖反馈时间
      } else {
        if (this.lottery.times > this.lottery.cynum) this.lottery.speed += 20; // 惯性 越来越慢
        this.index++;
        this.lottery.timer = setTimeout(this._rolling, this.lottery.speed);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.sudoku-wrap {
  width: 25rem;
  height: 26rem;
  margin: 0 auto;
  background-image: url("../img/lottery_box_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  padding: 0.33rem 0.33rem;
}
.sudoku-wrap ul {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  width: 25rem;
  height: 25rem;
  margin: 0 auto;
}
.sudoku-wrap ul li {
  width: 8rem;
  height: 8rem;
  margin: 0 0.2rem 0.2rem 0;
  background-image: url("../img/item_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
  padding: 0.1rem;
}
.sudoku-wrap ul li:nth-child(3),
.sudoku-wrap ul li:nth-child(6),
.sudoku-wrap ul li:nth-child(9) {
  margin-right: 0;
}
.sudoku-wrap ul li:nth-child(7),
.sudoku-wrap ul li:nth-child(8),
.sudoku-wrap ul li:nth-child(9) {
  margin-bottom: 0;
}
.sudoku-wrap ul li img {
  width: 100%;
}
.sudoku-wrap ul .start {
  width: 7.7rem;
  height: 7.7rem;
  background-image: url("../img/start.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.sudoku-wrap ul li.xx .item-xx {
  width: 8rem;
  height: 8rem;
  line-height: 0.4rem;
  margin: 0.2rem auto 0 auto;
  background-color: #041726;
  padding: 0.1rem 0.1rem 0.1rem 0.1rem;
  font-size: 0.33rem;
  color: #035d68;
}
.sudoku-wrap ul li.rw {
  padding-top: 0.14rem;
}
.sudoku-wrap ul li.rw .header {
  height: 3rem;
}
.sudoku-wrap ul li.rw img {
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
}
.sudoku-wrap ul li.rw .name {
  width: 6rem;
  height: 3rem;
  line-height: 3rem;
  margin: 0 auto;
  text-align: center;
  font-size: 1rem;
  background-image: url("../img/name_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  color: #00ffff;
}
.sudoku-wrap ul li.active::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0.05rem;
  width: 8rem;
  height: 8rem;
  background-color: rgba(0, 255, 110, 0.3);
}
.sudoku-wrap ul li.active .name {
  background-image: url("../img/name_current_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  color: #fff;
}
</style>
