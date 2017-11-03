/**
 * Created by bear on 2017/10/27.
 */
import {hex_sha1} from   './sha1'

 const keys = {
    APP_SECRET: "90dc11a7ce5f8c6f7c337b8f9eaac12397ezde",//登录的secret
    APP_KEY: "34b98c4eeoe24e3cbf2zb408fc5397c2",//登录的appkey
    APP_MACHINE: "wxh5", //登录的machine
    TIMESTAMP: (new Date()).valueOf()
}


export  const getSign=(data)=>{
    "use strict";

    let newData = {
        ...data,
        appkey: keys.APP_KEY,
        timestamp: keys.TIMESTAMP,
        machine: keys.APP_MACHINE
    };
    let arr = Object.keys(newData).sort().map((key) => newData[key])

    let signData = {
        ...newData,

        sign: hex_sha1(arr.join('') + keys.APP_SECRET)
    }


    return signData

}