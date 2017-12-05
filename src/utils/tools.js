/**
 * Created by bear on 2017/9/15.
 */

export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");


    var r = window.location.search.substr(1).match(reg);


    if (r != null) return unescape(r[2]);
    return null;
}


export const UrlSearch = () => {

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


export const setTitle = (title) => {
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

/***
 * 截取首页跳转路由
 * @param str
 * @returns {*}
 */

export function getPath(str) {
    if (str.indexOf('#') < 0) {
        return str
    } else {
        str = str.replace(str.substring(0, str.indexOf('#') + 1), '')
        return str
    }
}


let newDate = new Date();
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
// console.log(newDate.format('yyyy-MM-dd h:m:s'));


/***
 * 格式化时间戳  传入参数如 （val,'-'，':'）
 * @param number
 * @returns {string}
 */
function dateAddZero(number) {
    return (number < 10 ? '0' + number : number);
}

export function ymd(val, dateGapSign, timeGapSign) {
    var valType = typeof (val);
    if (valType == "string") {
        val = parseInt(val);
    }
    var date = new Date(val);
    var formatDate = date.getFullYear() + dateGapSign + dateAddZero(date.getMonth() + 1) + dateGapSign + dateAddZero(date.getDate()) + " " + dateAddZero(date.getHours()) + timeGapSign + dateAddZero(date.getMinutes()) + timeGapSign + dateAddZero(date.getSeconds());
    return formatDate;
}


/**
 * 对数组类对象针对某个相同属性值进行过滤
 * @param arr
 * @returns {*}
 */

export const delRepeat = (arr) => {

    let hash = {};
    arr = arr.reduce((item, next) => {

        if (!hash[next.id]) {
            hash[next.id] = item.push(next)
        }
        return item

    }, [])
    return arr


}


function pollAdd(arr) {
    let res = [];
    let tmp = {};

    arr.forEach((v) => {
        if (!tmp.hasOwnProperty(v.code)) {
            tmp[v.code] = res.length;
            return res.push(Object.assign({}, v));
        }
        res[tmp[v.code]].poll += v.poll;
    });

    return res;
}


export function plusXing(str, frontLen, endLen) {
    let len = str.length - frontLen - endLen;
    let xing = '';
    for (let i = 0; i < len; i++) {
        xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}


export function idcard(card) {
// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    console.log(reg.test(card))
    if (reg.test(card) === false) {
        return false;
    }

    return true

}


export const timeOut=(t)=>{
    "use strict";

    let date= Date.parse(new Date())

    if(t>date){

        return true

    }
    else  {
        return false
    }


}













