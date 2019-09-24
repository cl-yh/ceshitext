
import qs from "qs"
import axios from 'axios'
import VueAxios from 'vue-axios'

import Vue from 'vue'


import ElementUI from 'element-ui'

Vue.use(ElementUI)
// import VueCookies from 'vue-cookies'

// Vue.use(VueCookies)

Vue.use(VueAxios, axios)

Vue.use(qs)


Vue.config.productionTip = false

axios.defaults.baseURL = '/api/v1'

axios.defaults.timeout = 10000

const itme = 60*1000

axios.interceptors.request.use((config) => {
    config.headers={
        'Content-Type':'application/json',
        'X-Custom-Source': 'swagger',
        'Authorization': 'BasicAuth ' + window.$cookies.get('oss_url')
    }
    // config.headers.Authorization= 'BasicAuth ' + window.sessionStorage.getItem('oss_urlOne')
    return config;  //添加这一行
  }, (error) => {
    return Promise.reject(error);
  });

axios.interceptors.response.use(res=>{
    // console.log(window.$cookies.get("oss_url"),"1234568")
    if(res.status == 401){
        this.$message({
            message: '警告哦，这是一条警告消息',
            type: 'warning'
          });
    }
    console.log(res,"进来的数据是什么？？？")
    return res.data
}, err =>{
    // console.log(err,'进来了吗？？663'

    if(res.status == 401){
        this.$message({
            message: '警告哦，这是一条警告消息',
            type: 'warning'
          });
    }
    return Pormise.reject(err)
})

function hiedrList(hiedrList){
    return hiedrList
}
function handleParams (data) {
    return data
}
export default {
    post(url,data,response,exception){
        axios({
            method:"POST",
            url:url,
            data:data,
            timeout:itme,
            // headers:{
            //     'Content-Type':'application/json',
            //     'X-Custom-Source': 'swagger',
            //     'Authorization': 'BasicAuth ' + window.$cookies.get('oss_url')
            // }
        })
        .then((result)=>{
            response(
                hiedrList(result)
            )
        }).catch((error=>{
            // this.$message.error('错了哦，这是一条错误消息');
            return error
        }))

    },
    get(url,data,response,exception){
        axios({
            method:"GET",
            url:url,
            params:data,    //GET 传参不能用data要用params 否则报错
            timeout:itme,
        }).then((result)=>{
            response(
                hiedrList(result)
            )
        }).catch((error=>{
            return error
        }))
    },



}


