import {Loading, Message} from "element-ui"

import axios from 'axios'
import VueAxios from 'vue-axios'

import QS from "qs"

// Vue.use(Loading, Message)

// Vue.use(VueAxios, axios)

// Vue.use(qs)

//开始加载动画
let loading;
function startLoading() {
    loading  = Loading.service({
        lock:true, //是否锁定
        text:'拼命加载中...',//加载中需要显示的文字
        background:'rgba(0,0,0,.7)',//背景颜色
    });
}
//结束加载动画
function endLoading() {
    loading.close();
}



axios.defaults.baseURL = '/api/v1'

axios.defaults.timeout = 10000

axios.interceptors.request.use((config)=>{
    startLoading();//请求时的加载动画
    config.headers = {
        'Content-Type':'application/json',
        'X-Custom-Source': 'swagger',
        'Authorization': 'BasicAuth ' + window.$cookies.get('oss_url')
    }
    return config
},(err)=>{
    return Promise.reject(err)
})

axios.interceptors.response.use(
res=>{
    endLoading()  //停止动画
    if(res.status == 200){
        return Promise.resolve(res)    
    }else {
        return Promise.reject(res)  
    }
},err=>{

    endLoading()//如果错误也结束动画
  
    if(err.res.status){
        switch(err.res.status){
            case 401:
                router.replace({
                    path:"/",
                    query:{
                        redirect:router.currentRouter.fullPuth
                    }
                })
                break;
            case 403:
                router.replace({
                    path:"/",
                    query:{
                        redirect:router.currentRouter.fullPuth
                    }
                })
                break;
                default :({

                })
        }
        Message.error(error.response.data)
        return Promise.reject(error.response)
    }
})


export function get(url,params){
    return new Promise((redirect,reject)=>{
        axios.get(url,{params}).then(res=>{
            redirect(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export function post(url,params){
    return new Promise((redirect,reject) =>{
        axios.post(url,params).then(res=>{
            redirect(res)
        }).catch(err=>{
            reject(err)
        })
    })
}