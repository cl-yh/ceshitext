<!-- 首页 包含了接口请求 及 数据图片在地图上的展示  -->
<template>
    <div>
        首页
        <div class="shouye">首页</div>
        <div @click="commodity">商品详情页</div>
        <tuiJianda></tuiJianda>
        <div id="MapIcon"></div>
    </div>
    <!-- <router-view></router-view> -->
</template>
<script>
import tuiJianda from "../components/TuiJianda";
export default {
    components: {
        tuiJianda
    },
    data() {
        return {
            map:null,
            pool:null,
        };
    },
    methods: {
        commodity() {
            this.$router.push("/commodity");
        },
        GetList() {
            var data = {};
            this.axios
                .get("/Air/AirSites/EnumFactors", { data })
                .then(data => {
                    if (data.status == 200) {
                        // console.log(data, "数据");
                    }
                })
                .catch(err => {
                    // console.log("请求错误:" + err);
                });
            var promis = {
                groupByFirstLetter: false,
                supervise: [1, 2, 3, 4, 5],
                pageIndex: 1,
                pageSize: 100
            };

            this.$https.get(this.$api.sublevel.GetUserSites, promis, res => {
                if (res.status == 200) {
                    // console.log(res, "数据是多少？？");
                    this.pool = res.data.rows
                    this.Getlpps(res.data.rows);
                }
            });
        },
        GetCar() {
            var params = {
                dataLevel: 2,
                category: 1
            };
            var data = {
                dataLevel: 2,
                category: 1
            };
            // this.axios.get("/Air/AirSites/GetSiteReals",params).then(data =>{
            //     console.log(data,"数据2data")
            // }).catch(err=>{
            //     console.log('请从新？')
            // })

            // this.$https.get(this.$api.login.GetSiteReals, data, res => {
            //     console.log(res, "成功了吗");
            // });


            this.$axiosApi.GetSiteReals(data).then(res =>{
                console.log(res, "成功了吗");
            }).catch(err=>{
                console.log(err, "失败了吧？？");
            })
        },
        GetMap() {
            this.map = new BMap.Map("MapIcon",{
                enableMapClick: false
            });
            var ioprs = new BMap.Point(116.404, 39.915);
            this.map.centerAndZoom(ioprs, 12);
            this.map.enableScrollWheelZoom(true);
            var _this = this;
            function myFun(result) {
                var cityName = result.name;
                _this.map.setCenter(cityName);
                // alert("当前定位城市:" + cityName);
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        },
        Getlpps(data) {
           
            var json_data = [
                [116.404, 39.915],
                [116.383752, 39.91334],
                [116.384502, 39.932241]
            ];
            var pointArray = new Array();
            for (var i = 0; i < data.length; i++) {
                // var marker = new BMap.Marker(new BMap.Point(json_data[i][0], json_data[i][1])); // 创建点
                // map.addOverlay(marker);    //增加点
                // pointArray[i] = new BMap.Point(json_data[i][0], json_data[i][1]);
                // marker.addEventListener("click",attribute);
                pointArray[i] = new BMap.Point(
                    data[i].Longitude,
                    data[i].Latitude
                );
                var pt = new BMap.Point(data[i].Longitude, data[i].Latitude);
                var urldata ;
                if(data[i].Score < 70){
                     urldata  = require("../assets/newMapSite0.png")
                }else if(data[i].Score > 70&&data[i].Score <80){
                    urldata  = require("../assets/newMapSite2.png")
                }else if(data[i].Score < 80&&data[i].Score < 90){
                     urldata  = require("../assets/newMapSite1.png")
                }else if(data[i].Score > 90){
                     urldata  = require("../assets/newMapSite3.png")
                }
                var myIcon = new BMap.Icon(urldata,new BMap.Size(30, 30), {
                     
                        imageSize: new BMap.Size(30, 30) // 设置图片偏移
                    }    
                );
                var Img = new BMap.Marker(pt, { icon: myIcon }); // 创建标注

                this.map.addOverlay(Img);

                Img.addEventListener("click", attribute);
            }
            //让所有点在视野范围内
            // this.map.setViewport(pointArray);
            //获取覆盖物位置

            var _this= this
            function attribute(e) {
                var info = data
                var p = e.target;
                var SITEID = "";
                var TITLE = "";
                for (var i = 0; i < info.length; i++) {
                    if (info[i].lng == e.point.lng && info[i].lat == e.point.lat) {
                        SITEID = info[i].SITEID;
                        TITLE = info[i].TITLE;
                        break;
                    }
                }
                var point = new BMap.Point(e.point.lng, e.point.lat);
                var opts = {
                    title: "你是谁", // 信息窗口标题
                    enableMessage: false,//设置允许信息窗发送短息
                }
                var infowindow = new BMap.InfoWindow("SITEID：" + SITEID + "<br/>TITLE：" + TITLE, opts);
                _this.map.openInfoWindow(infowindow,point,12);
                // _this.map.addOverlay(point,12);  // 添加Overlay
            }
        }
    },
    mounted() {
        this.GetMap();
        this.GetCar();
        this.GetList();
    }
};
</script>
<style scoped>
.shouye {
    width: 100px;
    height: 100px;
    background: blue;
}
.icos-loff {
    color: red;
}
a {
    text-decoration: none;
}
#MapIcon {
    width: 1000px;
    height: 500px;
    margin: auto;
}
</style>
