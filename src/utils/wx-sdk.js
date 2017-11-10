import wx from 'weixin-js-sdk';


//微信分享统一处理
const Share = (config) => {

    wx.config({
        debug: false, // 开启调试模式
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: [
            'onMenuShareAppMessage', 'onMenuShareTimeline',
            'onMenuShareQQ', 'onMenuShareQZone','chooseImage','uploadImage'
        ]
    });


}
Share.prototype = {
    constructor: Share,
    init(config) {
        this.imgUrl = config.imgUrl;
        this.link = config.link;
        // this.musicPath = config.musicPath;
        this.description = config.description;
        this.title = config.title;

        wx.ready(() => {
            this.toFriend();
            this.toTimeline();
            this. toShareQQ();
            this.toShareQZone();
        });

        wx.error(res => {
            console.log(`${res}`);
        });
    },

    toFriend() {
        wx.onMenuShareAppMessage({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {

                // 用户确认分享后执行的回调函数
            },
        });
    },

    toTimeline() {
        wx.onMenuShareTimeline({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
        });
    },
    toShareQQ() {
        wx.onMenuShareQQ({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
        });
    },
    toShareQZone() {
        wx.onMenuShareQZone({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            error:function () {
                
            }
        });
    },
};





export { Share }
