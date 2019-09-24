<!-- 我的个人中心   -->
<template>
    <div class>
        我的
        <div class="wode">我的</div>
        <router-link to="/swiperList">点击进人swiper</router-link>

         <Div @click="inpdud">退去登录</Div>

        <tuiJianda></tuiJianda>
    </div>
   <!-- <router-view></router-view> -->
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
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

        inpdud(){
            this.$router.push("/")
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
    .wode{
        width: 100px;
        height: 100px;
        background: red;
    }
</style>