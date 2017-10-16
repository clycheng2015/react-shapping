const formatDate = function (str) {
    var date = new Date(str);
    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
};

const localItem = function (key, value) {


    if (arguments.length == 1) {

        return localStorage.getItem(key);
    } else {

        // var time=60
        // var cacheExpireDate = (new Date()-1)+time*1000;
        // var cacheVal = {val:value,exp:cacheExpireDate};
        // return localStorage.setItem(key,cacheVal);//存入缓存值
        //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
        return localStorage.setItem(key, value);
    }
};

const removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
};


function addcookie(name,value,expireHours){
    var cookieString=name+"="+escape(value)+"; path=/";
    //判断是否设置过期时间
    if(expireHours>0){
        var date=new Date();
        date.setTime(date.getTime+expireHours*3600*1000);
        cookieString=cookieString+"; expire="+date.toGMTString();
    }
    document.cookie=cookieString;
}

function getcookie(name){
    var strcookie=document.cookie;
    var arrcookie=strcookie.split("; ");
    for(var i=0;i<arrcookie.length;i++){
        var arr=arrcookie[i].split("=");
        if(arr[0]==name)return decodeURIComponent(arr[1]); //增加对特殊字符的解析
    }
    return "";
}

function delCookie(name){//删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getcookie(name);
    if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();


}
//定时 缓存
 const AppLocalStorage ={
    Cache : {
        /**
         * 总容量5M
         * 存入缓存，支持字符串类型、json对象的存储
         * 页面关闭后依然有效 ie7+都有效
         * @param key 缓存key
         * @param stringVal
         * @time 数字 缓存有效时间（秒） 默认60s
         * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
         * */
        put : function(key,stringVal,time){
            try{
                if(!localStorage){return false;}
                if(!time || isNaN(time)){time=60;}
                var cacheExpireDate = (new Date()-1)+time*1000;
                var cacheVal = {val:stringVal,exp:cacheExpireDate};
                localStorage.setItem(key,JSON.stringify(cacheVal));//存入缓存值
                //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
            }catch(e){}
        },
        /**获取缓存*/
        get : function (key){
            try{
                if(!localStorage){return false;}
                var cacheVal = localStorage.getItem(key);
                var result = JSON.parse(cacheVal);
                var now = new Date()-1;
                if(!result){return null;}//缓存不存在
                if(now>result.exp){//缓存过期
                    this.remove(key);
                    return "";
                }
                //console.log("get cache:"+key);
                return result.val;
            }catch(e){
                this.remove(key);
                return null;
            }
        },/**移除缓存，一般情况不手动调用，缓存过期自动调用*/
        remove : function(key){
            if(!localStorage){return false;}
            localStorage.removeItem(key);
        },/**清空所有缓存*/
        clear : function(){
            if(!localStorage){return false;}
            localStorage.clear();
        }
    }
     // AppLocalStorage.Cache.put("aaa",{name:"我是测试"},60)
     // let tset= AppLocalStorage.Cache.get("aaa")
     // console.log(tset)
}

export {formatDate, localItem, removeLocalItem,addcookie,getcookie,delCookie,AppLocalStorage};