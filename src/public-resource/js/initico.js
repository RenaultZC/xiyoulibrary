let initico = ()=>{
    let link = document.createElement("link");
    link.rel = "icon";
    link.href = require("../images/logo.ico");
    link.type = "image/x-icon";
    document.getElementsByTagName("head")[0].appendChild(link);
};
export default initico;