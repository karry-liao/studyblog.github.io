# 瀑布流

<ContainerBox title="介绍">
::: slot desc
根据属性计算来实现页面的布局
:::
</ContainerBox>
</ContainerBox>

## 代码演示

<ContainerBox title="效果展示">
<div class="demoBox">
<static-Pinterest-demo-Pinterest/>
</div>

<ShowCode>
::: slot codes
```vue
    .box {
          margin: 10px;
          column-count: 3;
          column-gap: 10px;
      }
      .item {
          margin-bottom: 10px;
      }
      .item img{
          width: 100%;
          height:100%;
      }
````
:::
</ShowCode>
</ContainerBox>

<ContainerBox title="瀑布流进阶">
::: slot desc

:::

<div class="demoBox">
<static-Pinterest-demo-waterfall/>
</div>

<ShowCode>
::: slot codes
```vue
<template>
<div class="waterfall">
    	<div class="waterfall-left">
            <div class="waterfall-left-item" v-for='(item,index) in waterLeft' :key='index'>{{item.content}}</div>
        </div>
        <div class="waterfall-right">
            <div class="waterfall-right-item" v-for='(ele,index) in waterRight' :key='index'>{{ele.content}}</div>
        </div>
</div>
</template>

<script>
export default {
    name:'Pinterest',
    data() {
        return {
            waterInfo: [
                        { content: '世间有千万种相遇，而有种遇见叫做一见倾心，红尘中惊鸿的一瞥，你便凝眸在我内心深处，而我为这一眼就开始为你步步沦陷，只想有你温暖的陪伴别无它求，弱水三千取一瓢饮，只想独享你的世界，安静品读。守一份承诺细诉着爱恋，步入你温暖的城池，人的一生有诸多的美好，而我情有独钟的是与你相濡以沫。' },
                        { content: '如果你的征途上有暴风雨，我愿把思念化作细丝，织成一把密密的友谊伞，让我们在暴风雨中走向胜境！' },
                        { content: '只是因为在人群中多看了你一眼，使我忘不了你容颜，你可知弦断的哀鸣？为你种情盅爱毒，受尽辗转轮回。你若如知弦鸣的悲凉，那手指余温可否换一世相守，且不问前世转身，且不诉前世别离，任它人间花如雨，平生至爱你一人。默然，相爱。寂静，欢喜。' },
                        { content: '就让我们一直走下去，直到世界一片纯白。' },
                        { content: '我醒了，想看看天上飘着的是，云做的雨还是雪做的云。' },
                        { content: '是谁，卷起秋风那无奈的萧瑟？是谁，在落花的泥土里浸染了无限的深情？是谁，点亮秋雨如针如丝的光芒？在秋雨深处，嗅到了寒凉的味道，让感觉缠绕丝丝缕缕秋的絮语。' },
                        { content: '时光的洪流中，我们总会长大。' },
                        { content: '飞机场的骚乱一会儿就停止了，这里的人都是有着自己的方向的，匆匆地起飞，匆匆地下降，带走别人的故事，留下自己的回忆。' },
                        { content: '和善良对峙的，不一定只是邪恶。可能也是残酷。和理想对峙的，不一定只是世俗。可能也是天真。' },
                        { content: '世间有千万种相遇，而有种遇见叫做一见倾心，红尘中惊鸿的一瞥，你便凝眸在我内心深处，而我为这一眼就开始为你步步沦陷，只想有你温暖的陪伴别无它求，弱水三千取一瓢饮，只想独享你的世界，安静品读。守一份承诺细诉着爱恋，步入你温暖的城池，人的一生有诸多的美好，而我情有独钟的是与你相濡以沫。' },
                        { content: '如果你的征途上有暴风雨，我愿把思念化作细丝，织成一把密密的友谊伞，让我们在暴风雨中走向胜境！' },
                        { content: '只是因为在人群中多看了你一眼，使我忘不了你容颜，你可知弦断的哀鸣？为你种情盅爱毒，受尽辗转轮回。你若如知弦鸣的悲凉，那手指余温可否换一世相守，且不问前世转身，且不诉前世别离，任它人间花如雨，平生至爱你一人。默然，相爱。寂静，欢喜。' },
                        { content: '就让我们一直走下去，直到世界一片纯白。' },
                        { content: '我醒了，想看看天上飘着的是，云做的雨还是雪做的云。' },
                        { content: '是谁，卷起秋风那无奈的萧瑟？是谁，在落花的泥土里浸染了无限的深情？是谁，点亮秋雨如针如丝的光芒？在秋雨深处，嗅到了寒凉的味道，让感觉缠绕丝丝缕缕秋的絮语。' },
                        { content: '时光的洪流中，我们总会长大。' },
                        { content: '飞机场的骚乱一会儿就停止了，这里的人都是有着自己的方向的，匆匆地起飞，匆匆地下降，带走别人的故事，留下自己的回忆。' },
                        { content: '和善良对峙的，不一定只是邪恶。可能也是残酷。和理想对峙的，不一定只是世俗。可能也是天真。' },
                    ],
                    waterLeft: [],
                    waterRight: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.waterInfo.forEach((item, index) => {
                    if (index % 2 == 0) {
                        this.waterLeft.push(item)
                    } else {
                        this.waterRight.push(item)
                    }
                })
            }
        }
}
</script>

<style lang="less" scoped>
    .waterfall {
            width: 100%;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-wrap: nowrap;
        }

        .waterfall-left,
        .waterfall-right {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        .waterfall-left-item,
        .waterfall-right-item {
            width: 100%;
            height: auto;
            padding: 20px;
            font-size: 14px;
            margin-bottom: 20px;
        }
</style>
````

:::
</ShowCode>
</ContainerBox>

<ContainerBox title="图片瀑布流组件封装">
::: slot desc

:::
<div class="demoBox">
<static-Pinterest-demo-waterfallimg :imgWidth='115' :imgColunms='5' MDimgList="https://tse3-mm.cn.bing.net/th/id/OIP-C.HnC0gr9-A8hxpUfaaZVXhgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.LDLWLczhxytu_k15N627UAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse3-mm.cn.bing.net/th/id/OIP-C.jFVwjH-R70_zfJoraajJDgHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.opehLjzd-cFR_dEPa2kNAQHaEo?w=203&h=127&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse4-mm.cn.bing.net/th/id/OIP-C.fkcwuQQ7PJ5C1nZyNkLUzgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse3-mm.cn.bing.net/th/id/OIP-C.rvsTW_ZssZN9FSAAht-tfgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse4-mm.cn.bing.net/th/id/OIP-C.-jKkXqFx5kY7BzZbLJpqWwAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse4-mm.cn.bing.net/th/id/OIP-C.fkcwuQQ7PJ5C1nZyNkLUzgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.3aX3gJa2BTCNPQ0b9vAVZAHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.8-SvkTBLEJ-WuSvm6txFwAHaJQ?w=203&h=254&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse3-mm.cn.bing.net/th/id/OIP-C.HnC0gr9-A8hxpUfaaZVXhgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.LDLWLczhxytu_k15N627UAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse3-mm.cn.bing.net/th/id/OIP-C.jFVwjH-R70_zfJoraajJDgHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.opehLjzd-cFR_dEPa2kNAQHaEo?w=203&h=127&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse4-mm.cn.bing.net/th/id/OIP-C.fkcwuQQ7PJ5C1nZyNkLUzgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse3-mm.cn.bing.net/th/id/OIP-C.rvsTW_ZssZN9FSAAht-tfgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse4-mm.cn.bing.net/th/id/OIP-C.-jKkXqFx5kY7BzZbLJpqWwAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse4-mm.cn.bing.net/th/id/OIP-C.fkcwuQQ7PJ5C1nZyNkLUzgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.3aX3gJa2BTCNPQ0b9vAVZAHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7,https://tse2-mm.cn.bing.net/th/id/OIP-C.8-SvkTBLEJ-WuSvm6txFwAHaJQ?w=203&h=254&c=7&r=0&o=5&dpr=1.5&pid=1.7"/>
</div>

<ShowCode>
::: slot codes
```vue
<script>
export default {
    data() { 
        return {
        }
    },
    props: {
    imgList: {
        type: Array,
        default: () => ['https://tse3-mm.cn.bing.net/th/id/OIP-C.HnC0gr9-A8hxpUfaaZVXhgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.LDLWLczhxytu_k15N627UAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse3-mm.cn.bing.net/th/id/OIP-C.jFVwjH-R70_zfJoraajJDgHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.opehLjzd-cFR_dEPa2kNAQHaEo?w=203&h=127&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse4-mm.cn.bing.net/th/id/OIP-C.fkcwuQQ7PJ5C1nZyNkLUzgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse3-mm.cn.bing.net/th/id/OIP-C.rvsTW_ZssZN9FSAAht-tfgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse4-mm.cn.bing.net/th/id/OIP-C.-jKkXqFx5kY7BzZbLJpqWwAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse4-mm.cn.bing.net/th/id/OIP-C.fkcwuQQ7PJ5C1nZyNkLUzgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.3aX3gJa2BTCNPQ0b9vAVZAHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.8-SvkTBLEJ-WuSvm6txFwAHaJQ?w=203&h=254&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse3-mm.cn.bing.net/th/id/OIP-C.HnC0gr9-A8hxpUfaaZVXhgHaKi?w=203&h=289&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.LDLWLczhxytu_k15N627UAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
              ]
    },
    imgWidth: {
        type: Number,
        default: 100
    },
    imgColunms: {
        type: Number,
        default: 4
        },
    isMarkDown: {
        type: Boolean,
        default:false
        },
    },
    methods: {
        waterfallHandler() {
            const imgWidth = this.imgWidth + this.imgColunms * 2;
            const contentW = document.getElementById("img-content").offsetWidth;
            // 获取图片的列数
            const column = parseInt(contentW / imgWidth);
            // 高度数组
            const heightArr = new Array(column).fill(0);
            const imgList = document.getElementsByClassName("img");
            for (let i = 0; i < imgList.length; i++) {
                const item = imgList[i];
                // 当前元素的高度
                item.onload = function () { 
                const itemHeight = item.offsetHeight;
                // 高度数组最小的高度
                console.log(itemHeight)
                const minHeight = Math.min(...heightArr);
                // 高度数组最小的高度的索引
                const minIndex = heightArr.indexOf(minHeight);
                item.style.top = minHeight + "px";
                item.style.left = minIndex * imgWidth + "px";
                heightArr[minIndex] += itemHeight +3;
                }

            }
        }
    },
    mounted() {
    window.onresize = () => {
        return (() => {
           
        })();
        };
           this.waterfallHandler();
    },
}
</script>
````

:::
</ShowCode>
</ContainerBox>

## API

<ContainerBox title="Props">
::: slot desc

| 参数                           | 说明                                              | 类型   | 默认值 |
| ------------------------------ | ------------------------------------------------- | ------ | ------ |
| imgWidth                         | 瀑布流单个图片宽度         | Number   | 100px      |
| imgColunms                    | 瀑布流图片列数 | Number   | 4      |
| imgList                    | 瀑布流图片地址 | Array   | []      |


:::
</ContainerBox>