<!--  -->
<template>
    <div class>
        <div @click="$router.back(-1);">返回上一层</div>
        <div @click="examin">进入下一层</div>
        <div class="comm-soo"></div>
        <div id="container"></div>
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
            map:null,
            myMap:null
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        examin() {
            this.$router.push("/examin");
        },
        // gisBaiduMap() {
        //     var map = new BMap.Map("container"); // 创建地图实例
        //     var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        //     map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别
        //     map.enableScrollWheelZoom(true); //滚动缩放
        // },
        initMap: function() {
            var me = this;

            this.map = new BMap.Map("container"); //在百度地图容器中创建一个地图
            //创建和初始化地图函数：
            createMap(); //创建地图
            setMapEvent(); //设置地图事件
            addMapControl(); //向地图添加控件

            //创建地图函数：
            function createMap() {
                var point = new BMap.Point(121.607973, 31.18491); //定义一个中心点坐标
                me.map.centerAndZoom(point, 11); //设定地图的中心点和坐标并将地图显示在地图容器中
                me.myMap = me.map; //将map变量存储在当前Controller全局中
            }

            //地图事件设置函数：
            function setMapEvent() {
                me.map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
                me.map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
                me.map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
                me.map.enableKeyboard(); //启用键盘上下左右键移动地图
            }

            //地图控件添加函数：
            function addMapControl() {
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE
                });
                me.map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    isOpen: 1
                });
                me.map.addControl(ctrl_ove);
                //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT
                });
                me.map.addControl(ctrl_sca);
            }
        },
        //添加事件监听
        mapAddEventListener: function() {
            var me = this;
            me.myMap.removeOverlay(me.addMarker);
            var clickEvent = function(e) {
                if (me.view.getUIStatus() != "VIEW") {
                    me.view
                        .getCmp("editPanel->longitude")
                        .sotValue(e.point.lng);
                    me.view.getCmp("editPanel->latitude").sotValue(e.point.lat);
                    var point = new BMap.Point(e.point.lng, e.point.lat); //将标注点转化成地图上的点
                    //
                    var myIcon = new BMap.Icon(
                        "http://api.map.baidu.com/img/markers.png",
                        new BMap.Size(23, 25),
                        {
                            offset: new BMap.Size(10, 25), // 指定定位位置
                            imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
                        }
                    );
                    me.myMap.removeOverlay(me.addMarker);
                    me.addMarker = new BMap.Marker(point, { icon: myIcon }); //将点转化成标注点
                    me.myMap.addOverlay(me.addMarker); //将标注点添加到地图上
                }
            };
            me.myMap.addEventListener("click", clickEvent);
        },
        //查看数据时定位
        positionMap: function(retData) {
            var me = this;
            if (retData.longitude) {
                var bdLng = retData.longitude;
                var bdLat = retData.latitude;
                var point = new BMap.Point(bdLng, bdLat); //将标注点转化成地图上的点
                var myIcon = new BMap.Icon(
                    "http://api.map.baidu.com/img/markers.png",
                    new BMap.Size(23, 25),
                    {
                        offset: new BMap.Size(10, 25), // 指定定位位置
                        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
                    }
                );
                me.addMarker = new BMap.Marker(point, { icon: myIcon }); //将点转化成标注点

                me.myMap.addOverlay(me.addMarker); //将标注点添加到地图上

                me.myMap.centerAndZoom(point, 13);
            }
        },
        //描绘省份轮廓线
        addSCBorder: function() {
            var me = this;
            var blist = [];

            /**
             * 添加行政区划
             * @param {} districtName 行政区划名
             * @returns  无返回值
             */
            function addDistrict(districtName) {
                
                //使用计数器来控制加载过程
                //使用百度接口加载边界经纬度数据
                var bdary = new BMap.Boundary();
                bdary.get(districtName, function(rs) {
                    //获取行政区域
                    blist.push({
                        points: rs.boundaries[0],
                        name: districtName
                    });
                    drawBoundary();
                });
            }

            function drawBoundary() {
                //包含所有区域的点数组
                var pointArray = [];

                /*画遮蔽层的相关方法
                 *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
                 *      这样就做出了一个经过多次西北角的闭合多边形*/
                //定义中国东南西北端点，作为第一层
                var pNW = { lat: 59.0, lng: 73.0 };
                var pNE = { lat: 59.0, lng: 136.0 };
                var pSE = { lat: 3.0, lng: 136.0 };
                var pSW = { lat: 3.0, lng: 73.0 };
                //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
                var pArray = [];
                pArray.push(pNW);
                pArray.push(pSW);
                pArray.push(pSE);
                pArray.push(pNE);
                pArray.push(pNW);
                //循环添加各闭合区域
                //添加显示用标签层
                var label = new BMap.Label(blist[0].name, {
                    offset: new BMap.Size(20, -10)
                });
                label.hide();
                me.map.addOverlay(label);

                //添加多边形层并显示
                var ply = new BMap.Polygon(blist[0].points, {
                    strokeWeight: 7,
                    strokeColor: "#00FFFF",
                    fillOpacity: 0.01,
                    fillColor: "#00FFFF"
                }); //建立多边形覆盖物
                ply.name = blist[0].name;
                ply.label = label;
                ply.Type = "Border";
                 me.map.addOverlay(ply);

                //将点增加到视野范围内
                var path = ply.getPath();
                pointArray = pointArray.concat(path);
                //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
                pArray = pArray.concat(path);
                pArray.push(pArray[0]);

                //限定显示区域，需要引用api库
                try {
                     me.map.setViewport(pointArray); //调整视野
                } catch (err) {
                    console.log(err);
                }

                //添加遮蔽层
                var plyall = new BMap.Polygon(pArray, {
                    strokeOpacity: 0.0000001,
                    strokeColor: "#04121b",
                    strokeWeight: 0.00001,
                    fillColor: "#04121b",
                    fillOpacity: 0.2
                }); //建立多边形覆盖物
                plyall.Type = "Border";
                 me.map.addOverlay(plyall);
            }

            addDistrict("深圳市宝安区");
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.initMap();
        this.addSCBorder();
        this.mapAddEventListener();
        this.positionMap();

    },
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    updated() {}, //生命周期 - 更新之后
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    beforeDestroy() {} //生命周期 - 销毁之前
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.comm-soo {
    width: 100px;
    height: 100px;
    background: black;
}
#container {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
}
</style>