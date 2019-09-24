<!-- 子路由和地图放大缩小 -->
<template>
<div class=''>
    <div class="shouye">
        我是子组件,我进来了 
    </div>
    <tuiJianda></tuiJianda>
    <div class="Mapposition" ref="poop">
        <div class="Fanda"    @click="GetListMap" v-if="isMagnify">放大</div>
        <div class = "Suoxiao" @click="GetdataMap" v-else>缩小</div>

        <div id="Magnify"  ref="mapList"></div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tuiJianda from "../components/TuiJianda";
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        tuiJianda
    },
    data() {//这里存放数据
        return {
            map:null,
            isMagnify:true,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
      
    },
    //方法集合
    methods: {
        GetMap(){
            this.map = new BMap.Map("Magnify",{
                enableMapClick: false
            })
            this.map.centerAndZoom(
                new BMap.Point(116,30),
                12
            ); // 初始化地图,设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(true); 
        },
        GetMapTwo(){
            this.map = new BMap.Map("Magnify",{
                enableMapClick: false
            })
            this.map.centerAndZoom(
                new BMap.Point(116,30),
                12
            ); // 初始化地图,设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(true); 
        },
        GetListMap(){
            
            this.$refs.mapList.style.width = "1000px"
            this.$refs.mapList.style.height = "1000px"
            
            this.$refs.poop.style.width = "1000px"
            this.$refs.poop.style.height = "1000px"
            this.isMagnify =false
        },
        GetdataMap(){
            this.$refs.mapList.style.width = "300px"
            this.$refs.mapList.style.height = "300px"

            this.$refs.poop.style.width = "300px"
            this.$refs.poop.style.height = "300px"
            this.isMagnify =true;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.GetMap()
    },
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    updated() {}, //生命周期 - 更新之后
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    beforeDestroy() {}, //生命周期 - 销毁之前
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
    .shouye{
        width:100px;
        height:100px;
        background: blue;
    }
    a{
        text-decoration: none;
    }
    #Magnify{
        width: 300px;
        height: 300px;
        margin: auto;
    }
    .Mapposition{
        width: 300px;
        height: 300px;
        margin: auto;
        position:relative;
    }
    .Fanda , .Suoxiao{
        position: absolute;
        top: 10px;
        left:10px;
        z-index: 1;
    }
</style>