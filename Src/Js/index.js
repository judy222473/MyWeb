import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css"
import bootstrapJs from "bootstrap"
import scss from "../Scss/index.scss"

import { createApp } from 'vue'

createApp({
    data(){
        return{
            items:[
                {
                    img_class:{"fa-solid":true,"fa-9":true,},
                    link:"./sudo.html",
                    title:"數獨",
                    date:"Made By 2022/7/3",
                    content:"能夠使用DFS產生非唯一解數獨，並且搭配Vue、Bootstrap、Lodash等套件實現功能",
                },
                {
                    img_class:{"fa-solid":true,"fa-gauge-high":true,},
                    link:"./dejavu.html",
                    title:"CSS儀表板",
                    date:"Made By 2022/7/6",
                    content:"使用CSS偽類再搭配一系列的絕對定位還有Vue完成此功能",
                },

            ]
        }
    }
}).mount("#app");

