<!-- 获取位置 -->
<template>
<div class=''>
    <div @click="$router.back(-1);">返回上一页</div>
    <div @click="shoopin">进入下层</div>
    <div class="shoop-com"></div>
    <Div class="ditu">

        <div class="container" id="container"></div>
    </Div>
    
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    shoopin(){
        this.$router.push('/shoopin')
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    var map = new BMap.Map("container");          // 创建地图实例  
    var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
    map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true);              //滚动缩放
    // 58a1eaf9d16a99658ceb8b5a469c99f2
    // map.setMapStyleV2({   
    //     // 地图样式更改  
    //     styleId: '58a1eaf9d16a99658ceb8b5a469c99f2'
    // });
    //定位到当前城市
    // function myFun(result){
    //     var cityName = result.name;
    //         map.setCenter(cityName);
    //         alert("当前定位城市:"+cityName);
    //     }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
    //创建大量的坐标点
    var json_data = [[116.404,39.915],[116.383752,39.91334],[116.384502,39.932241]];
	var pointArray = new Array();
	for(var i=0;i<json_data.length;i++){
		// var marker = new BMap.Marker(new BMap.Point(json_data[i][0], json_data[i][1])); // 创建点
		// map.addOverlay(marker);    //增加点
		// pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);
        // marker.addEventListener("click",attribute);
       pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);
        var pt = new BMap.Point(json_data[i][0], json_data[i][1]);
        var myIcon = new BMap.Icon(
                require("../assets/car-g.png"),
                new BMap.Size(50, 30),
                {
                    anchor: new BMap.Size(15, 30)
                }
            );
           var Img = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
           map.addOverlay(Img);

           Img.addEventListener("click",attribute);
	}
	//让所有点在视野范围内
	map.setViewport(pointArray);
	//获取覆盖物位置
	function attribute(e){
		var p = e.target;
		alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);    
	}	

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
    .shoop-com{
        width: 100px;
        height:100px;
        background:brown;
    }
    .ditu{
        width: 1000px;
        height:1000px;
        margin: 0px auto;
    }
    .container{
        width:100%;
        height:100%;
    }
</style>    