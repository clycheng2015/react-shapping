/**
 * Created by bear on 2017/9/13.
 */

export const home = {
    homeUrl: "/circle/homelist", //POST   参数 pagenum 页数  pagesize 每页显示条数 cid 一级菜单目录，不传就是推荐，id为99999
    tabsUrl: "/findgoods/categorylist"//POST,
}

export const item = {
    itemListUrl: "/findgoods/categoryalllist",//POST   参数 pagenum 页数  pagesize 每页显示条数 cid 一级菜单目录
}
export const goodsDetail = {
    detailUrl: "/findgoods/goodsinfo",//POST   参数 pagenum 页数  pagesize 每页显示条数 id  商品id
    addCarUrl: '/cart/editcart',//post  goods_num goods_att1  goods_att2  id goods_id


    killUrl:"/findgoods/seckillgoodsinfo",
    dislUrl:"/findgoods/discountgoodsinfo"




}
export const itemList = {
    detailUrl: "/findgoods/goodslist",//POST   参数 pagenum 页数  pagesize 每页显示条数 cid  分类id
}


export const moreList = {
    listUrl: "/circle/searchall",//POST   参数 pagenum 页数  pagesize 每页显示条数 cid  分类id type
}



export const search = {
    detailUrl: "/findgoods/goodsSearch",//POST   参数 pagenum 页数  pagesize 每页显示条数 word  关键字

}
export const auth = {
    loginUrl: "/user/login",//POST   mobile   password
    regUrl: '/user/register',  //POST mobile  password  smscode
    regCodeUrl: "/user/sendregsms",//post mobile
    sendCodeUrl: '/user/sendresetpwdsms',  //POST mobile
    resetPwdUrl: '/user/resetpwd',   //POST mobile  password  smscode
}
export const user = {
    userInfoUrl: "/my/userinfo",//POST   uid   获取用户信息
    withdrawalsUrl: "/user/withdrawals",// 申请提现  POST params{uid	是	string	用户idtiqumoney	是	string	要提取的金额money	是	string	可以提取的金额bankname	是	string	银行名字banknum	是	string	银行卡bankusername	是	string	卡主姓名mobile}
    billUrl: "/my/bill",//账单 POST params{pagenum  pagesize}
    updateNameUrl: '/user/updateRealname',//修改名称  uid  realname
    orderListUrl: '/order/h5ordergoodslist',//修改名称  uid  state  订单状态：待付款[1] 、已付款[2]、已发货[3] 、交易结束[4] pagenum  pagesize
    // orderListUrl: '/order/ordergoodslist',//修改名称  uid  state  订单状态：待付款[1] 、已付款[2]、已发货[3] 、交易结束[4] pagenum  pagesize
    addressUrl: '/address/updateaddress', //新增修改收货地址   post：     uid: "", id: '', realname:'', mobile:'', province:'', city:'', county:'', address:'',isdefault:''
    defaultAddressUrl: "/address/setdefaultaddress", //设置默认地址   post  uid   id  地址id
    delAddressUrl: "/address/deladdress",//删除地址 post  uid   id
    getAddressUrl: "/address/getaddress",//获取用户地址  uid
    restPhoneUrl: "/user/resetphone",//获取用户地址  uid
    sendRestSmsUrl: "/user/sendresetphonesms",//修改手机号发送url

    carCreateOrderUrl: "/order/seccreategoodsorder",//创建订单
    gsCreateOrderUrl: '/order/secdirectcreategoodsorder',//直接从详情页创建订单
    activeOrder:"/order/secdirectcreateseckillorder" ,//活动订单

    delOrder:"/order/delorder",//删除订单

    getOrderDetail:"/order/getgoodsorderdetail",//删除订单

    topUpUrl:"/order/createrechargeorder",//充值

    drawMoneyUrl:"/user/withdrawals",//提现

    payUrl:'/wechat/pay/index',//支付接口

    expPayUrl:'/order/successorder',//余额支付

    postage:"/findgoods/findyf",//获取邮费
    refundUrl:"/order/applyrefund",//申请退款
    comfirmUrl:"/order/confirmreceipt",//确认收货





}

export const car = {

    carList: "/cart/cartlist",//获取购物车列表
    delCarList: '/cart/delcart',//删除购物车
    updateCarNum: '/cart/editnum', //修改购物数量


}


export const active = {
    activeList:"/findgoods/seckilllist",//列表
    activeDetail: "/findgoods/seckillgoodsinfo",//秒杀商品详情
    disList: "/findgoods/discountlist",//超值特惠
}


export const wxSdkConfig={

    shareUrl:"/wechat/pay/fenxiang",

}




