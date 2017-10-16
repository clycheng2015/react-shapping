import qs from 'qs'
import instance from '../utils/instance'
import {addcookie}  from '../utils/cookie'



const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);
    return null;
}


let code = getQueryString("code");






if (code && code.length > 0) {

    instance.post('/user/getOpenid',qs.stringify({code:code}))
        .then((res) => {
            console.log("=======================")
            console.log(res)
            if (res.code == 200) {

                addcookie('wxopenid', res.data.openid, 720)

            }
            console.log("=======================")

        })
        .catch((err) => {
            "use strict";
            console.log("=======================")
            console.error('error', err)
            console.log("=======================")
        })
}


