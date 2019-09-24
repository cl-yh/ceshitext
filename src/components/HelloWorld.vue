<!-- 登录页 -->
<template>
    <div>
        <input type="text" placeholder="请输入账号" v-model="zhang" />
        <input type="text" placeholder="请输入密码" v-model="mi" />
        <button @click="Getpsot">登录</button>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用

    components: {},
    data() {
        // const axios = require("axios");
        //这里存放数据
        return {
            zhang: "yuhao",
            mi: 12345678
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        inpidd() {
            // this.axios.post('http://122.152.225.176:801/api/v1/Account/Login',{
            //         LoginName: this.zhang,
            //         PassWord: this.mi,
            //         RememberMe: true

            // }).then((response)=>{
            //     this.newsList=response.data.data;
            // }).catch((response)=>{
            //     console.log(response);
            // })

            // console.log(this.zhang,this.mi,"on")
            // /v1/Account/Login
            var psok = {
                LoginName: this.zhang,
                PassWord: this.mi,
                RememberMe: true
            };
            var _this = this;
            this.$https.post(this.$api.make.Login, psok, res => {
                console.log(res, 1111);
                if (res.statu == 200) {
                    this.$cookies.set("oss_url", res.data.Ticket, 60 * 60 * 24);
                    console.log(this.$cookies.get("oss_url"), "存了token吗");
                    this.$router.push("/follsPosd");
                } else {
                    this.$message("这是一条消息提示");
                }
            });

            // then((response) => {
            //     console.log(response.data)
            //     if(response.status == 200){
            //         // window.sessionStorage.setItem ('zhangsan',response.data.data.Ticket)
            //       this.$cookies.set('oss_url', response.data.Ticket,60 * 60 * 24);
            //         _this.$router.push('/follsPosd')
            //     }
            // }).catch((err) => {
            //    console.log( "请求错误:"+err)
            // })
            //     var getData= {
            //             LoginName: this.zhang,
            //             PassWord: this.mi,
            //             RememberMe: true
            //   }
            //     this.$http.post('http://122.152.225.176:801/api/v1/Account/Login',getData).then((response) => {
            //     console.log(response.data)
            //     })
        },
        Getpsot() {
            var data = {
                LoginName: this.zhang,
                PassWord: this.mi,
                RememberMe: true
            };
            this.$axiosApi.ling(data).then(res=>{
                console.log(res,"我是你？？")
                if(res.status ==200){
                    this.$cookies.set("oss_url", res.data.Ticket, 60 * 60 * 24);
                    this.$router.push("/follsPosd");
                }
            }).catch(err=>{
                console.log("你是谁？？")
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
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
a {
    text-decoration: none;
    outline: none;
    color: black;
}
</style>