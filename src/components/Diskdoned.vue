<!-- 画轨迹 -->
<template>
    <div class>
        推荐
        <div class="tuijian">推荐</div>
        <router-link to="/CandkLsisd">进子组件1</router-link>
        <router-link to="/candkls">进子组件2</router-link>
        <tuiJianda></tuiJianda>
        <div id="Tiesplay" @click="Tiesplay">播放</div>
        <div @click="Pause">暂停</div>
        <div @click="reset">重置</div>
        <div id="allmap"></div>
    </div>
    <!-- <router-view></router-view> -->
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tuiJianda from "../components/TuiJianda";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: { tuiJianda },
    data() {
        //这里存放数据
        return {
            Img: "",
            dataList: [],
            index: 0,
            map: null,
            timer: null,
            FastForward: 100,
            centerPoint: null
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        GetList(data) {
            //创建地图 生成路线渲染图标
            this.map = new BMap.Map("allmap"); // 创建Map实例
            this.map.centerAndZoom(
                new BMap.Point(data[0].Lng, data[0].Lat),
                12
            ); // 初始化地图,设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

            var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                scale: 0.6, //图标缩放大小
                strokeColor: "#fff", //设置矢量图标的线填充颜色
                strokeWeight: "2" //设置线宽
            });
            var icons = new BMap.IconSequence(sy, "10", "30");
            // 创建polyline对象

            // new BMap.Point(104.038748,30.641821),
            // new BMap.Point(104.047789,30.648128),
            // new BMap.Point(104.063959,30.655336),
            // new BMap.Point(104.067264,30.660307),
            // new BMap.Point(104.067264,30.664438),
            // new BMap.Point(104.064008,30.665316),
            // this.centerPoint = new BMap.Point((data[0].lng + data[data.length - 1].lng) / 2, (data[0].lat + data[data.length - 1].lat) / 2);
            // this.map.panTo(this.centerPoint);
            var pois = [];
            var dataPm;
            for (var i = 0; i < data.length - 2; i++) {
                var pointtwo = new BMap.Point(data[i].Lng, data[i].Lat);
                this.dataList.push(pointtwo);

                var ipos = new BMap.Point(data[i].Lng - 0, data[i].Lat - 0);
                var iposOne = new BMap.Point(data[i + 1].Lng - 0,data[i + 1].Lat - 0);

                var pois = [ipos, iposOne];
                if (data[i].Data == null) {
                    dataPm = 0;
                } else {
                    dataPm = data[i].Data.PM10;
                }
                var removeTime = this.GetTiem(
                    data[i].Time.substring(11),
                    data[i + 1].Time.substring(11)
                );
                if (removeTime) {
                    console.log("不画");
                } else {
                    // var PM10 = Carshistory.validData[i + 1].Data== null ? 0 : Carshistory.validData[i + 1].Data.PM10;
                    if (dataPm == 0 || dataPm == null) {
                        this.map.addOverlay(new BMap.Polyline(pois, {
                                strokeColor: "gray",
                                strokeWeight: 7,
                                strokeOpacity: 1
                            })
                        );
                    } else if (dataPm <= 70) {
                        this.map.addOverlay(new BMap.Polyline(pois, {
                                strokeColor: "#11CD6E",
                                strokeWeight: 7,
                                strokeOpacity: 1
                            })
                        );
                    } else if (dataPm > 70 && dataPm <= 150) {
                        this.map.addOverlay(new BMap.Polyline(pois, {
                                strokeColor: "#FFCC00",
                                strokeWeight: 7,
                                strokeOpacity: 1
                            })
                        );
                    } else {
                        this.map.addOverlay(new BMap.Polyline(pois, {
                                strokeColor: "#F63C5E",
                                strokeWeight: 7,
                                strokeOpacity: 1
                            })
                        );
                    }
                }
            }
            console.log(pois, "数据");

            var pt = new BMap.Point(data[0].Lng, data[0].Lat);

            var myIcon = new BMap.Icon(
                require("../assets/car-g.png"),
                new BMap.Size(50, 30),
                {
                    anchor: new BMap.Size(15, 30)
                }
            );
            this.Img = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
            this.map.addOverlay(this.Img);
            // console.log(pois,'东西了？？')
            // var polyline =new BMap.Polyline(pois, {
            // enableEditing: false,//是否启用线编辑，默认为false
            // enableClicking: true,//是否响应点击事件，默认为true
            // // icons:[icons],
            // strokeWeight:'8',//折线的宽度，以像素为单位
            // strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
            // strokeColor:"#18a45b" //折线颜色
            // });

            // map.addOverlay(polyline);          //增加折线
            // var _this = this
            // var bdary = new BMap.Boundary();
            // bdary.get("深圳市宝安区", function(rs) {
            //     //获取行政区域
            //     // map.clearOverlays();        //清除地图覆盖物
            //     var count = rs.boundaries.length; //行政区域的点有多少个
            //     if (count === 0) {
            //         alert("未能获取当前输入行政区域");
            //         return;
            //     }
            //     var pointArray = [];
            //     for (var i = 0; i < count; i++) {
            //         var ply = new BMap.Polygon(rs.boundaries[i], {
            //             strokeWeight: 2,
            //             strokeColor: "#ff0000"
            //         }); //建立多边形覆盖物
            //        _this.map.addOverlay(ply); //添加覆盖物
            //         pointArray = pointArray.concat(ply.getPath());
            //     }
            //     // _this.map.setViewport(pointArray); //调整视野
            // });
        },
        GetData() {
            //接口数据
            var data = {
                rectify: true,
                vehicleId: "72942813-a390-e811-8173-7ca23e8cb87f",
                beginDate: "2019-09-09 00:00:00",
                endDate: "2019-09-09 23:59:59",
                sortOrder: "ASC",
                pageIndex: 1,
                pageSize: 5000
            };
            this.$https.get(this.$api.login.GetVehicleTrack, data, res => {
                if (res.status == 200) {
                    this.GetList(res.data.rows);
                }
                console.log(res, "进来了吗？？？");
            });
        },
        GetTiem(beginTime, endTime) {
            //时间处理
            var strb = beginTime.split(":");
            if (strb.length != 3) {
                return false;
            }

            var stre = endTime.split(":");
            if (stre.length != 3) {
                return false;
            }

            var b = new Date();
            var e = new Date();

            b.setHours(strb[0]);
            b.setMinutes(strb[1]);
            b.setMilliseconds(strb[2]);
            e.setHours(stre[0]);
            e.setMinutes(stre[1]);
            e.setMilliseconds(stre[2]);

            if (e.getTime() - b.getTime() >= 300000) {
                return true;
            } else {
                //alert("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
                return false;
            }
        },
        Tiesplay() {
            //播放轨迹
            var _this = this;
            var point = this.dataList[this.index];
            var point2 = this.dataList[this.index - 1];

            this.Img.setPosition(point);
            if (this.index != 0) {
                this.loopList(this.Img, point2, point);
            }

            this.index++;

            if (this.index < this.dataList.length) {
                this.timer = window.setTimeout(function() {
                    _this.Tiesplay(this.index);
                }, this.FastForward);
            } else {
                this.map.panTo(point);
            }
        },
        Pause() {
            //暂停轨迹
            if (this.timer) {
                window.clearTimeout(this.timer);
            }
        },
        reset() {
            if (this.timer) {
                window.clearTimeout(this.timer);
            }
            this.index = 0;
            this.Img.setPosition(this.dataList[0]);
            this.map.panTo(this.centerPoint);
        },
        loopList(marker, curPos, targetPos) {
            //将图标旋转角度
            var deg = 0;
            //start!
            var curPos = this.map.pointToPixel(curPos);
            var targetPos = this.map.pointToPixel(targetPos);

            if (targetPos.x != curPos.x) {
                var tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x),
                    atan = Math.atan(tan);
                deg = (atan * 360) / (2 * Math.PI);
                //degree  correction;
                if (targetPos.x < curPos.x) {
                    deg = -deg + 90 + 90;
                } else {
                    deg = -deg;
                }

                marker.setRotation(-deg);
            } else {
                var disy = targetPos.y - curPos.y;
                var bias = 0;
                if (disy > 0) bias = -1;
                else bias = 1;
                marker.setRotation(-bias * 90);
            }
            return;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$router.push("/candkls");

        this.GetData();
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
.tuijian {
    width: 100px;
    height: 100px;
    background: palevioletred;
}
#allmap {
    width: 1000px;
    height: 500px;
    overflow: hidden;
    margin: 0 auto;
    font-family: "微软雅黑";
}
</style>