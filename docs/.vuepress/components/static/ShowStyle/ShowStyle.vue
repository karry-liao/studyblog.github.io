<template>
    <div class="navigation" :class="status?'active':''">
        <div v-for="(item,index) in icon" :key="index">
            <span :style="item.styles" @click="showIcon()"><i :class="item.IconName"></i></span>
        </div>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            icon: [
                {
                    styles: '--i:0;--x:-1;--y:0;',
                    IconName:"icon ion-home"
                },             {
                    styles: "--i:1;--x:1;--y:0;",
                    IconName:"icon ion-alert-circled"
                },             {
                    styles: "--i:2;--x:0;--y:-1;",
                    IconName:"icon ion-alert-circled"
                },             {
                    style: "--i:3;--x:0;--y:1;",
                    IconName:"icon ion-alert-circled"
                },             {
                    styles: "--i:4;--x:1;--y:1;",
                    IconName:"icon ion-alert-circled"
                },             {
                    styles: "--i:5;--x:-1;--y:-1;",
                    IconName:"icon ion-alert-circled"
                },             {
                    styles: "--i:6;--x:0;--y:1;",
                    IconName:"icon ion-alert-circled"
                },             {
                    styles: "--i:7;--x:-1;--y:1;",
                    IconName:"icon ion-alert-circled"
                },             {
                    styles: "--i:8;--x:1;--y:-1;",
                    IconName:"icon ion-alert-circled"
                }, 
            ],
            status:false
        }
    },
    methods: {
        showIcon() { 
            this.status = !this.status
        }
    },
    mounted() {
    }

}
</script>

<style scoped>
*{margin: 0; padding: 0;}
.navigation {
	position: relative;
	width: 100px;
	height: 100px;
	background: #212532;
	border-radius: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.5s;
	transition-delay: .8s;
    left: 30%;
}
.navigation.active {
	width: 300px;
	height: 300px;
	transition-delay: 0;
}
.navigation span{
	position: absolute;
	width: 7px;
	height: 7px;
	background: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(calc(24px * var(--x)), calc(24px * var(--y)));
	transition:  transform 0.5s, width 0.5s, height 0.5s, background 0.5s;
	transition-delay: calc(0.1s * var(--i));
}
.navigation.active span{
	width: 40px;
	height: 40px;
	background: #333849;
	transform: translate(calc(100px * var(--x)), calc(100px * var(--y)));
}
.navigation span i{
	transition: 0.5s;
	font-size: 1em;
}
.navigation.active span i{
	font-size: 1.35em;
	color: #fff;
}
.navigation.active span:hover {
	color: #2dfc52;
	filter: drop-shadow(0 0 2px #2dfc52) drop-shadow(0 0 5px #2dfc52) drop-shadow(0 0 15px #2dfc52);
}
</style>