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