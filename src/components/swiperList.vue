<!-- swiper 走马灯的效果  （一直循环播放） -->
<template>
    <div id="container">
        <div class="swiper-container weedPodks">
            <div class="swiper-wrapper">
                <div class="swiper-slide">你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？</div>
               <div class="swiper-slide">你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？</div>
               <div class="swiper-slide">你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？</div>
               <div class="swiper-slide">你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？</div>
               <div class="swiper-slide">你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？你是谁？你是谁？你是谁？你是谁？你是谁？？？</div>
               
            </div>
            <!-- <div class="swiper-pagination"></div> -->
            <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
        </div>
    </div>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";

// import swiper from 'swiper'

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
    name: "carrousel",
    data() {
        return {}
    },
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    var mySwiper = new Swiper('.swiper-container',{
        // loop: true,    //设置循环滚动
   
        // // speed:3000,  //设置图片滚动速度
        // // 自动滚动，注意与上面的loop不一样，loop是指能否从最后位置滚动回第一的位置
        autoplay:{  //每滚动一个图片后等待的时间，这里设置为1ms就是代表没有等待
            delay: 1, //触摸后不会停止自动滚动
            disableOnInteraction:false,
        },
        // // pagination: {
        // //     el: '.swiper-pagination',
        // // },
        // // slidesPerView:4, //同时显示多少个图片
        // // spaceBetween: 1,   //两图片之间的空隙

        // autoplay : 1,     
        speed:3000,
        loop : true,
        freeMode:true,
        slidesPerView : 5,
        slidesPerGroup : 1,
    })
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},

destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
updated() {}, //生命周期 - 更新之后
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
beforeDestroy() {}, //生命周期 - 销毁之前
    
};
</script>
<style scoped>
.swiper-container {
      height: 150px;  /*设置整个跑马灯高度*/
    }
    .weedPodks{
        width: 100%;
        height: 100%;
    }
    #container{
        width: 500px;
        height: 100px;
        line-height:100px;
        margin: auto;
    }
    .swiper-container-free-mode > .swiper-wrapper {
        -webkit-transition-timing-function: linear;    /*之前是ease-out*/
        -moz-transition-timing-function: linear;
        -ms-transition-timing-function: linear;
        -o-transition-timing-function: linear;
        transition-timing-function: linear;
        margin: 0 auto;
    }
</style>