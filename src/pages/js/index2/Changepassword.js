let ChangePassword = ()=>{//修改密码
    let cpassword =document.getElementsByClassName("cpassword");
    let password =document.getElementsByClassName("password");
    let change = document.getElementById("change");
    let changepassword = document.getElementById("changepassword");
    let id = document.getElementById("id").value;
    let SendNewPassword = ()=>{
        if(password[1].value !== password[2].value){
            alert("输入的新密码两次不一致，请重新输入");
            password[0].value = "";
            password[1].value = "";
            password[2].value = "";
        }else if(password[0].value === "" || password[1].value === "" || password[2].value === ""){
            alert("请输入密码");
        }else{
            Ajax.changepassword(id,password[0].value,password[1].value,password[2].value);
        }
    };

    change.style.height = window.innerHeight+"px";
    cpassword[0].addEventListener("click",function () {//打开窗口
        changepassword.style.display = "block";
        change.style.display = "block";
    },false);
    cpassword[1].addEventListener("click",SendNewPassword,false);
    password[2].addEventListener("keyup",function (event) {
        if(event.key === "Enter"){
            SendNewPassword();
        }
    });
    document.getElementsByClassName("close")[0].onclick = function () {
        changepassword.style.display = "none";
        change.style.display = "none";
    };
};
export default ChangePassword;