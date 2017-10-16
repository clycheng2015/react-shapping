/**
 * Created by bear on 2017/9/15.
 */

export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");


    var r = window.location.search.substr(1).match(reg);


    if (r != null) return unescape(r[2]);
    return null;
}


export const  UrlSearch=()=> {

    var name, value;
    var str = location.href;
    var num = str.indexOf("?")
    str = str.substr(num + 1);

    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}


function isPasswd(s) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s)) return false
    return true
}




export const setTitle=(title)=>{
    document.title = title;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none; width: 0; height: 0;';
    iframe.src = 'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/0F/ChMkJ1erCriIJ_opAAY8rSwt72wAAUU6gMmHKwABjzF444.jpg';
    const listener = () => {
        setTimeout(() => {
            iframe.removeEventListener('load', listener);
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 0);
        }, 0);
    };
    iframe.addEventListener('load', listener);
    document.body.appendChild(iframe);




}