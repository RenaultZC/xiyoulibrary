class Server{
    constructor(){//定义需要调用公共变量
        this.session = null;
        this.url = "https://api.xiyoumobile.com/xiyoulibv2/";
    }
    creatscript(url){//进行jsonp跨域请求
        let script = document.createElement("script");
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    setsession(){
        return this.session=encodeURIComponent(document.cookie);
    }
    login(username,password){
        let url = `${this.url}user/login?username=${username}&password=${password}&callback=Login`;
        this.creatscript(url);
        window.Login = (data)=>{
           if(data.Result){
               document.cookie = encodeURI(data.Detail);
           }else{
               alert("用户名或者密码错误");
           }
        }
    }
    userinfo(){//获取用户信息
        let url = `${this.url}user/info?session=${this.session}&callback=UserInfo`;
        this.creatscript(url);
        window.UserInfo = (data)=>{
            if(data.Result){
                let info = document.getElementById("info");
                info.style.display = "block";
                info.innerHTML = `<ul><li class='pContent' align='center'>学号:${data.Detail.ID}</li><li class='pContent' align='center'>姓名:${data.Detail.Name}</li><li class='pContent' align='center'>班级:${data.Detail.Department}</li><li class='pContent' align='center'>欠费金额:${data.Detail.Debt}</li><li class='pContent'><button class='cpassword'>修改密码</button></li></ul>`;
                document.getElementById("id").value = data.Detail.ID;
            }else{
                alert("获取信息失败");
            }
        }
    }
    rank(){//获取借阅排行
        let url = `${this.url}book/rank?callback=Rank`;
        this.creatscript(url);
        window.Rank = (data)=>{
            if(data.Result){
                    for(let i =0;i<data.Detail.length;i++){
                        let div = document.createElement("div");
                        let p = document.createElement("p");
                        let span = document.createElement("span");
                        let Rank = document.getElementById("Rank");
                        div.className = "rank-content";
                        p.innerHTML = `《${data.Detail[i].Title}》`;
                        div.appendChild(p);
                        span.innerHTML = `排行:${data.Detail[i].Rank}借阅次数${data.Detail[i].BorNum}分类号:${data.Detail[i].Sort}`;
                        div.appendChild(span);
                        Rank.appendChild(div);
                    }

            }else{
                alert("获取接口失败");
            }
        }
    }
    rent(){//获取借阅书籍
        let url = `${this.url}user/rent?session=${this.session}&callback=Rent`;
        this.creatscript(url);
        window.Rent = (data)=>{
            if(data.Result){
                if(data.Detail === "NO_RECORD"){
                    let div = document.createElement("div");
                    let info = document.getElementById("info");
                    div.innerHTML = `<p class='NONE' align='center'>你还没有借书，赶快去借几本吧</p>`;
                    div.fontSize = "51px";
                    info.appendChild(div);
                }else{
                    let div = document.createElement("div");
                    let info = document.getElementById("info");
                    div.innerHTML = `<ul><li>书名</li><li>所在分馆</li><li>当前状态</li><li>应还日期</li><li>续借</li></ul>`;
                    div.className = "rentHead";
                    info.appendChild(div);
                    for(let i = 0;i<data.Detail.length;i++){
                        let div = document.createElement("div");
                        div.innerHTML = `<ul><li> ${data.Detail[i].Title} </li><li>${data.Detail[i].Department}</li><li>${data.Detail[i].State}</li><li>${data.Detail[i].Date}</li><li>${data.Detail[i].false?"<button class='click-active'>续借</button>":"<button class='click-none'>续借</button>"}</li></ul>`;
                        div.className = "rentContent";
                        info.appendChild(div);
                    }
                    sessionStorage.setItem("rent",JSON.stringify(data.Detail));
                }
            }else{
                alert("用户未登录");
            }
        }
    }
    renew(index){//续借书籍
        if(index === -1) return;
        let rentsession = JSON.parse(sessionStorage.getItem("rent"))[index];
        let url = `${this.url}user/renew?session=${this.session}&barcode=${rentsession.Barcode}&department_id=${rentsession.Department_id}&libray_id=&${rentsession.Library_id}callback=Renew`;
        window.Renew = (data)=>{
            if(data.Result){
                alert("续借成功");
            }else{
                alert("续借失败");
            }
        }
    }
    renthistory(){//借阅历史
        let url = `${this.url}user/history?session=${this.session}&callback=RentHistory`;
        this.creatscript(url);
        window.RentHistory = (data)=>{
            if(data.Result){
                let div = document.createElement("div");
                let history = document.getElementById("history");
                div.innerHTML = `<ul><li>书名</li><li>操作类型</li><li>操作日期</li></ul>`;
                div.className = "historyHead";
                history.appendChild(div);
                for(let i = 0;i<data.Detail.length;i++){
                    let div = document.createElement("div");
                    div.innerHTML = `<ul><li> ${data.Detail[i].Title} </li><li>${data.Detail[i].Type}</li><li>${data.Detail[i].Date}</li></ul>`;
                    div.className = "historyContent";
                    history.appendChild(div);
                }
            }else{
                alert("获取信息失败");
            }
        }
    }
    changepassword(username,password,newpassword,repassword){//修改密码
        let url = `${this.url}user/modifyPassword?sessin=${this.session}&username=${username}&password=${password}&newpassword=${newpassword}&repassword=${repassword}&callback=ChangePassword`;
        this.creatscript(url);
        window.ChangePassword = (data)=>{
            if(data.Detail === "MODIFY_SUCCEED"){
                alert("修改成功");
                history.go(0);
            }else if(data.Detail === "INVALID_PASSWORD"){
                alert("旧密码不正确");
            }else if(data.Detail === "INVALID_ERROR:"){
                alert("其他参数错误");
            }else{
                alert("参数缺省");
            }
        }
    }
    newslist(type,page){//获取新闻
        let url = `${this.url}news/getList/${type}/${page}?callback=NewsList`;
        this.creatscript(url);
        window.NewsList = (data)=>{
            if(data.Detail.Type === "新闻"){
                for(let i = 0;i<data.Detail.Data.length;i++){
                    let div = document.createElement("div");
                    div.innerHTML = `<ul><li>标题:${data.Detail.Data[i].Title}</li><li>日期:${data.Detail.Data[i].Date}</li></ul>`;
                    div.className = "newContent";
                    document.getElementById("new").appendChild(div);
                }
            }else{
                for(let i = 0;i<data.Detail.Data.length;i++){
                    let div = document.createElement("div");
                    div.innerHTML = `<ul><li>标题:${data.Detail.Data[i].Title}</li><li>日期:${data.Detail.Data[i].Date}</li></ul>`;
                    div.className = "announceContent";
                    document.getElementById("announce").appendChild(div);
                }
            }
        }
    }
    favorite(){//获取收藏
        let url = `${this.url}user/favorite?session=${this.session}&callback=Favorite`;
        this.creatscript(url);
        window.Favorite = (data)=>{
            if(data.Result){
                if(data.Detail=="NO_RECORD"){
                    let div = document.createElement("div");
                    let collection = document.getElementById("collection");
                    div.innerHTML = "<p class='NONE' align='center'>你还没有收藏，赶快去收藏几本吧</p>";
                    div.fontSize = 51+"px";
                    collection.appendChild(div);
                }else{
                    let div = document.createElement("div");
                    let collection = document.getElementById("collection");
                    div.innerHTML = "<ul><li>书名</li><li>出版社</li><li>作者</li><li>索书号</li></ul>";
                    div.className = "collectionHead";
                    collection.appendChild(div);
                    for(let i = 0;i<data.Detail.length;i++){
                        let div = document.createElement("div");
                        div.innerHTML = `<ul><li> ${data.Detail[i].Title} </li><li>${data.Detail[i].Pub}</li><li>${data.Detail[i].Author}</li><li>${data.Detail[i].Sort}</li></ul>`;
                        div.className = "collectionContent";
                        collection.appendChild(div);
                    }
                }
            }else{
                alert("用户未登录");
            }
        }
    }
}
export default Server;