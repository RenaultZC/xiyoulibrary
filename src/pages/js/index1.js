import ajax from '../../../src/public-resource/js/ajax.js';
import ico from '../../../src/public-resource/js/initico';
import canvas from '../../../src/public-resource/js/drawcanvas';

require("../css/index1.css");

let Ajax = new ajax;
    ico();
let send = ()=>{
    let username,password;
    username = document.getElementById("id").value;
    password = document.getElementById("password").value;
    if(username && password){
        Ajax.login(username,password);
    }else{
        alert("请输入用户名或密码");
    }
};
window.onload = function () {
    canvas();
    document.getElementById("btn").addEventListener("click",send,false);
    document.getElementById("password").addEventListener("keyup",function (e) {
        if(e.key == "Enter")    send();
    },false);
};