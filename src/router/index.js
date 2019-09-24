import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import follsPosd from "@/components/FollsPosd"
import Diskdoned from "@/components/Diskdoned"
import FesieKolld from "@/components/FesieKolld"
import CandkLsisd from "@/components/CandkLsisd"
import candkls from "@/components/candkls"

import commodity from "@/components/commodity"
import examin from "@/components/examin"
import shoopin from "@/components/shoopin"


import  swiperList from "@/components/swiperList"

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        children:[
        ]
    },
    {
        path: '/follsPosd',
        name: 'follsPosd',
        component: follsPosd,
    },
    {
        path: '/Diskdoned',
        name: 'Diskdoned',
        component: Diskdoned,
        children:[{
            path:"/CandkLsisd",
            name:'CandkLsisd',
            component:CandkLsisd,
        },{
            path:"/candkls",
            name:'candkls',
            component:candkls,
        }]
    },
    {
        path: '/FesieKolld',
        name: 'FesieKolld',
        component: FesieKolld,
    },

    
    {
        path: '/commodity',
        name: 'commodity',
        component: commodity,
    },
    {
        path: '/examin',
        name: 'examin',
        component: examin,
    },
    {
        path: '/shoopin',
        name: 'shoopin',
        component: shoopin,
    },
    {
        path: '/swiperList',
        name: 'swiperList',
        component: swiperList,
    },
  ]
})
