# 幸运大乐透之刮刮乐

<ContainerBox title="介绍">
::: slot desc
本节内容为转盘抽奖组件，包括使用九宫格个转盘抽奖样例
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="Demo">
<div class="demoBox">
<static-LuckyRolling-LuckyRolling/>
</div>

<ShowCode>

::: slot codes

```javascript
export default {
  data() {
    return {
      isrun: false,
      rotateAngle: 0, // 旋转角度
      config: {
        duration: 4000, // 总旋转时间 ms级
        circle: 8, // 旋转圈数
        mode: "ease-in-out", // 由快到慢 惯性效果都省了
      },
      cricleAdd: 1, // 第几次抽奖
      drawIndex: 0, // 中奖索引 转盘图片排序 指针右手开始 0-...
    };
  },
  computed: {
    rotateStyle() {
      const _c = this.config;
      return `
        -webkit-transition: transform ${_c.duration}ms ${_c.mode};
        transition: transform ${_c.duration}ms ${_c.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`;
    },
  },
  props: {
    httpData: {}, // 接口调用所需参数
    stateData: {
      type: Object,
      default: () => {
        return {
          coin: 0, // 超级币数量
          prize_img: "", // 转盘图片
        };
      },
    },
  },
  methods: {
    async run() {
      if (this.stateData.coin < 10) {
        console.log("超级币不足");
        return;
      }
      if (this.isrun) return;
      // const data = await this.goDraw()
      // 可以作为弹窗等信息展示
      this.$emit("draw_fin", "start");
      this.$set(this.stateData, "coin", 0); // 更新数据，此处仅为示例，推荐使用 draw_fin方法的 start/fin 进行相应数据更新
      this.isrun = true;
      this.rotateAngle =
        this.config.circle * 360 * this.cricleAdd -
        (22.5 + this.drawIndex * 45);
      // 圈数位置解析
      // this.config.circle * 360 * this.cricleAdd 顺时针总圈数/累积总圈数
      // 22.5 + this.drawIndex * 45 ===> (奖品位置 === this.drawIndex * 45) (指针中间位置 === 22.5)

      this.cricleAdd++;
      setTimeout(() => {
        this.$emit("draw_fin", "fin");
        this.isrun = false;
      }, this.config.duration);
    },
    goDraw() {
      // 请求接口拿到中奖商品
      // 加下自己项目的样式 loading 用户体验
      return new Promise(async (resolve, reject) => {
        // await 奖品接口
        resolve({
          msg: "抽奖明细",
        });
      });
    },
  },
};
```

:::
</ShowCode>
</ContainerBox>

## API

<ContainerBox title="Props">
::: slot desc

| 参数      | 说明                           | 类型   | 默认值                    |
| --------- | ------------------------------ | ------ | ------------------------- |
| stateData | 默认抽奖币数量和抽奖项目背景图 | Object | {coin: 10,prize_img: url} |

:::
</ContainerBox>

## 代码演示

<ContainerBox title="Demo">
<div class="demoBox">
<static-LuckyRolling-sudolu/>
</div>
</ContainerBox>

<ShowCode>

::: slot codes

```javascript
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
```

:::
</ShowCode>
</ContainerBox>

## API

<ContainerBox title="Props">
::: slot desc

| 参数      | 说明     | 类型  | 默认值 |
| --------- | -------- | ----- | ------ |
| awardList | 默认奖励 | Array | []     |

:::
</ContainerBox>
