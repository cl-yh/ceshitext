// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'

import https from "../src/allscripts/untuy/https"
import api from "../src/allscripts/untuy/api"

import axiosApi from "../src/allscripts/unAxios/axiosApi"

// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.min.css'


// Vue.use(VueAwesomeSwiper)

Vue.use(VueCookies)
// window.Swiper = Swiper
Vue.use(Vuex)

// Vue.use(Swiper)
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$https = https
Vue.prototype.$api = api

Vue.prototype.$axiosApi = axiosApi

// axios.defaults.baseURL = '/api/v1'

// axios.interceptors.request.use((config) => {
    
//     config.headers={
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Type':'application/json',
//         'X-Custom-Source': 'swagger',
//         'Authorization': 'BasicAuth ' + window.$cookies.get('oss_url')
//         // config.headers.Authorization= 'BasicAuth ' + window.sessionStorage.getItem('oss_urlOne')
//     }
//     return config;  //添加这一行
//   }, (error) => {
//     return Promise.reject(error);
//   });

// axios.interceptors.response.use(res=>{
//     // console.log(window.$cookies.get("oss_url"),"1234568")
//     // if(){

//     // }
//     return res.data
// }, err =>{
//     console.log(err,'进来了吗？？663')
//     // if(){

//     // }
//     return Pormise.reject(err)
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

