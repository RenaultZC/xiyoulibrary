import ajax from '../../../src/public-resource/js/ajax.js';
import ico from '../../../src/public-resource/js/initico';
import canvas from '../../../src/public-resource/js/drawcanvas';
import ChangeHead from './index2/ChangeHead.js';
import ChangePassword from './index2/Changepassword.js';

require("../css/index2.css");

let Ajax = new ajax;live

let GetInformation = ()=>{//ajax进行跨域请求获取用户信息
    Ajax.setsession();
    Ajax.userinfo();
    Ajax.rank();
    Ajax.rent();
    Ajax.renthistory();
    Ajax.favorite();
    for(let i = 0;i <= 10;i++){
        Ajax.newslist("news",i);
        Ajax.newslist("announce",i);
    }
};


let SendRenew = (event)=>{//发送续借信息
    let btn = document.querySelectorAll(".rentContent ul li button");
    let j = -1;
    for(let i = 0;i < btn.length;i++){
        if(btn[i] ===event.target){
            j = i;
            break;
        }
    }
    if(j === -1)   Ajax.renew(j);
};

ico();
GetInformation();

window.onload = ()=>{
    canvas();
    document.getElementById("body").style.height = window.innerHeight-document.getElementById("head").style.height-100+"px";
    document.getElementById("head").addEventListener("click",ChangeHead,false);
    ChangePassword();
    document.getElementById("info").addEventListener("click",SendRenew,false);
};