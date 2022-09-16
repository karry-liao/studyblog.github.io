<template>
      <div id="img-content" class="img-content">
        <img
            class="img"
            :style="'width:' + imgWidth + 'px;'"
            v-for="(item, index) in imgList"
            :key="'img' + index"
            :src="item"
        />
    </div>
</template>

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

<style lang="less" scoped defer="defer">
    .img-content {
        height: 50vh;
        width: 660px;
        position: relative;
        .img {
            position: absolute;
            vertical-align: top;
            margin: 3px;
        }
    }
</style>