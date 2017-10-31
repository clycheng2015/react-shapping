/**
 * Created by bear on 2017/10/30.
 */



export const nativeClick = (i) => {
    console.log(i)
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let data = {
        type:i.type,
        url:i.url,
        id:i.id,
        name:i.name,
        activeType:i.activeType
    }
    if (isAndroid) {
        window.android.H5Click(JSON.stringify(data))

    }
    if (isiOS) {
        window.webkit.H5Click.AppModel.postMessage(data);
    }
}


export const nativeRefresh=(fn)=>{
    "use strict";
    console.log(i)
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let data = {
        type:i.type,
        url:i.url,
        id:i.id,
        name:i.name,
        activeType:i.activeType
    }
    if (isAndroid) {
        window.android.H5Click(JSON.stringify(data))

    }
    if (isiOS) {
        window.webkit.H5Click.AppModel.postMessage(data);
    }

}
