import {post,get} from "../unAxios/http"

export default {
    ling(params){    //登录
        return post("/Account/Login",params)
    },
    GetSiteReals(params){
        return get("/Air/AirSites/GetSiteReals",params)
    }
  

}