/**
 * Created by bear on 2017/9/13.
 */

export const home = {
    homeUrl: "/v2/circle/open/sechomelist", //POST
    moreListUrl:"/app/findgoods/open/goodslist" // 参数 pagenum 页数  pagesize


}
export const item = {
    itemListUrl: "/app/findgoods/open/categoryalllist",//POST   参数 pagenum 页数  pagesize 每页显示条数 cid 一级菜单目录
}
export const goodsDetail = {

    detailUrl: "/app/findgoods/open/goodsinfo",//Get

    addCarUrl: '/app/cart/editcart',//post  goods_num goods_att1  goods_att2  id goods_id

    killUrl:"/app/findgoods/open/seckillgoodsinfo",


    dislUrl:"/app/findgoods/open/discountgoodsinfo"
}
export const itemList = {

    detailUrl: "/app/findgoods/open/goodslist",//POST   参数 pagenum 页数  pagesize 每页显示条数 cid  分类id

}
export const moreList = {
    listUrl: "/app/circle/searchall",//POST   参数 pagenum 页数  pagesize 每页显示条数 cid  分类id type
}

export const search = {
    detailUrl: "/app/findgoods/open/goodsSearch",//POST   参数 pagenum 页数  pagesize 每页显示条数 word  关键字
}
export const auth = {
    loginUrl: "/app/user/open/login",//POST   mobile   password
    regUrl: '/app/user/open/register',  //POST mobile  password  smscode


    regCodeUrl: "/app/user/open/sendregsms",//post mobile

    sendCodeUrl: '/app/user/open/sendresetpwdsms',  //POST mobile
    resetPwdUrl: '/app/user/open/resetpwd',   //POST mobile  password  smscode
}
export const user = {
    userInfoUrl: "/app/my/userinfo",//POST   uid   获取用户信息


    withdrawalsUrl: "/app/user/withdrawals",// 申请提现  POST params{uid	是	string	用户idtiqumoney	是	string	要提取的金额money	是	string	可以提取的金额bankname	是	string	银行名字banknum	是	string	银行卡bankusername	是	string	卡主姓名mobile}
    billUrl: "/app/my/bill",//账单 POST params{pagenum  pagesize}
    updateNameUrl: '/app/user/updateRealname',//修改名称  uid  realname
    orderListUrl: '/app/order/h5ordergoodslist',//修改名称  uid  state  订单状态：待付款[1] 、已付款[2]、已发货[3] 、交易结束[4] pagenum  pagesize
    // orderListUrl: '/order/ordergoodslist',//修改名称  uid  state  订单状态：待付款[1] 、已付款[2]、已发货[3] 、交易结束[4] pagenum  pagesize
    addressUrl: '/app/address/updateaddress', //新增修改收货地址   post：     uid: "", id: '', realname:'', mobile:'', province:'', city:'', county:'', address:'',isdefault:''
    defaultAddressUrl: "/app/address/setdefaultaddress", //设置默认地址   post  uid   id  地址id
    delAddressUrl: "/app/address/deladdress",//删除地址 post  uid   id
    getAddressUrl: "/app/address/getaddress",//获取用户地址  uid
    restPhoneUrl: "/app/user/resetphone",//获取用户地址  uid
    sendRestSmsUrl: "/app/user/sendresetphonesms",//修改手机号发送url

    carCreateOrderUrl: "/app/order/seccreategoodsorder",//创建订单
    gsCreateOrderUrl: '/app/order/secdirectcreategoodsorder',//直接从详情页创建订单
    activeOrder:"/app/order/secdirectcreateseckillorder" ,//活动订单
    delOrder:"/app/order/delorder",//删除订单
    getOrderDetail:"/app/order/getgoodsorderdetail",//
    topUpUrl:"/app/order/createrechargeorder",//充值
    drawMoneyUrl:"/app/user/withdrawals",//提现
    payUrl:'/v2/pay/api',//支付接口
    expPayUrl:'/app/order/successorder',//余额支付
    postage:"/app/findgoods/open/findyf",//获取邮费
    refundUrl:"/app/order/applyrefund",//申请退款
    comfirmUrl:"/app/order/confirmreceipt",//确认收货
    jinfuUrl:"/app/findgoods/open/findjfjfgoodslist",
    helpUrl:"/app/findgoods/open/fuwulist",

    telUrl:"/app/user/open/getlxdh",

    icbannerUrl:"/app/ad/open/getadinfos",

    protoUrl:"/app/user/open/getprotocol",

    badgeUrl:'/app/order/ordernum',


    upLoadImgUrl:"/app/my/open/wxuploadhead"




}

export const car = {

    carList: "/app/cart/cartlist",//获取购物车列表
    delCarList: '/app/cart/delcart',//删除购物车
    updateCarNum: '/app/cart/editnum', //修改购物数量

    banner:"/app/cart/open/cartsd"


}


export const active = {
    activeList:"/app/findgoods/seckilllist",//列表
    activeDetail: "/app/findgoods/seckillgoodsinfo",//秒杀商品详情
    disList: "/app/findgoods/discountlist",//超值特惠
}


export const wxSdkConfig={

    shareUrl:"/app/share/open/fenxiang",

}




