import qs from 'qs'
import instance from '../utils/instance'
import {wxSdkConfig} from '../utils/api'
import {Share} from '../utils/wx-sdk'

export const currentAnimate = (cls) => ({
    type: 'CURRENT_ANIMATE',
    cls
})


const updateShareUrl = () => ({

    type: "UPDATE_SHARE_URL"
})

export const changeTab = (witchTab) => ({
    type: 'CHANGE_TAB',
    payload: {selectedTab: witchTab}
})


/**
 * @param shareInfo {imgUrl,title,description,link}
 */

export const fetchWxConfig = (shareInfo) => {
    "use strict";
    let href = window.location.href

    // let href='http://mlg.vo01.cn/?toUrl=&openid=ocR4-0qtFtZ3VOn_mGrfMSrLtB64&from=singlemessage&isappinstalled=0#/login'

    if (href.indexOf('&from=singlemessage&isappinstalled=0') > 0) {
        href = href.replace('&from=singlemessage&isappinstalled=0', '')

        // window.location.href=href
    }

    if (href.indexOf('from=singlemessage&isappinstalled=0') > 0) {

        href = href.replace('from=singlemessage&isappinstalled=0', '')

        // window.location.href=href
    }

    href = encodeURIComponent(href)

    return (dispatch, getState) => {
        instance.get(wxSdkConfig.shareUrl + `?url=${href}`)
            .then(res => {
                dispatch(updateShareUrl())
                const share = new Share({
                    appid: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature, // 必填，签名
                });
                share.init({...shareInfo});

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}