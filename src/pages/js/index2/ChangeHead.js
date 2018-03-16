let ChangeHead = (event)=>{//给头列表增加点击事件
    let div = document.querySelectorAll("#body .content");
    let Li = document.querySelectorAll("#head ul li");
    let j;
    for(let i = 0;i < Li.length;i++){
        Li[i].className = "list-none";
        div[i].style.display = "none";
        if(Li[i] === event.target) {
            j = i;
        }
    }
    Li[j].className = "list-active";
    div[j].style.display = "block";
};
export default ChangeHead;