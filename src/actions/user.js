/**
 * Created by bear on 2017/9/15.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {user} from '../utils/api'
import * as types from '../utils/const'
import {Toast} from 'antd-mobile'
import {pay} from '../utils/weipay'

const userInfo = (userInfo) => ({
    type: types.GET_USERINFO,
    userInfo
});


export const savePath = (data) => ({
    type: types.SAVE_PATH_STATE,
    data

})


const updateName = () => ({

    type: types.UPDATE_NAME

})


const requestOrderList = (tab) => ({
    type: types.REQUEST_ORDER_LIST,
    tab,
});

const receiveOrderList = (tab, orderState, datalist, pagenum, pagesize, success) => ({

    type: types.RECEIVE_ORDER_LIST,
    tab,
    orderState,
    pagenum,
    pagesize,
    datalist,
    success
})


export const orderTabChange = (tab, state, index) => ({

    type: types.ORDER_TAB_CHANGE,
    tab, state, index
})


export const loginOut = () => ({

    type: types.LOGIN_OUT

})


const myBill = (pagenum, pagesize, data) => ({

    type: types.GET_BILL_LIST
    , pagesize, pagenum, data

})


/**
 * 新增地址
 */

const addAdress = () => ({

    type: types.ADD_ADDRESS


})
/**
 * 获取地址
 */
const getAdress = (data) => ({

    type: types.GET_ADDRESS,
    data

})


/**
 * 设置默认
 */
const defaultAds = () => ({

    type: types.DEFAULT_ADDRESS,

})

/**
 * 删除地址
 */
const delAds = () => ({

    type: types.DEL_ADDRESS,

})

/**
 * 发送验证

 */
const sendRestPhoneSms = () => ({
    type: types.SENDE_REST_PHONE_SMS,

})

/**
 * 修改手机号
 * @param data
 */
const updatePhone = (data) => ({
    type: types.REST_PHONE,
    data

})

/**
 * 购物车创建订单
 */

const carCreateOrder = (data) => ({
    type: types.CAR_CREATE_ORDER,
    data


})


/**
 * 商品详情页创建订单
 */

const goodsCreateOrder = (data) => ({
    type: types.GOODS_CREATE_ORDER,
    data


})


/**
 * 商品详情页创建订单
 */

const activeOrder = (data) => ({

    type: types.GOODS_ACTIVE_ORDER,

    data
})


/**
 * 商品详情页创建订单
 */

const delOrder = () => ({
    type: types.DEL_ORDER,


})


/**
 * 获取订单详情
 */

const getOrderDetail = (data) => ({


    type: types.GET_ORDER_DETAIL,
    data

})

/**
 * 充值
 */

const topUp = (data) => ({


    type: types.TOP_UP,

    data

})
/**
 * 提现
 */

const withDraw = (data) => ({


    type: types.DRAW_MONET,

    data

})



/**
 * 微信支付
 */

const gopay = (data) => ({


    type: types.GO_PAY,

    data

})


/**
 * 余额支付
 */

const goMoneyPay = (data) => ({


    type: types.GOTO_MONEY_PAY,

    data
})


/**
 * 保存支付订单
 */

export  const savePayOrder = (data) => ({


    type: types.SAVE_PAY_ORDER,

    data

})


/**
 * 获取邮费
 */

export  const getPostage = (data) => ({


    type: types.GET_POSTAGE,

    data

})

/**
 * 申请退款
 */

export  const applyRefund = (data) => ({


    type: types.APPLY_REFUND,

    data

})

/**
 * 确认收货
 */

export  const comfirmOreder = (data) => ({

    type: types.CONFIRM_BUY_ORDER,

    data

})


/**
 * 确认收货
 */

export  const refundRemark = (data) => ({

    type: types.REFUND_REMARK,

    data

})

/**
 * 获取帮助中心
 */

export  const getHelp = (data) => ({

    type: types.GET_HELP,

    data

})

/**
 * 获取客服电话
 */

export  const getTel = (data) => ({

    type: types.GET_Tel,

    data

})


/**
 *
 * @param data
 * @returns {function(*, *)}
 *
 *
 */
  const getJinfu = (data) => ({
    type: types.GET_JINFU_PRO,
    data

})



/**
 *
 * @param data
 * @returns {function(*, *)}
 *
 *
 */
 export const orderRemark = (data) => ({
    type: types.ORDER_REMARK,
    data

})



/**
 *
 * @param data
 * @returns {function(*, *)}
 *
 *
 */
 export const getIcBanner = (data) => ({
    type: types.GET_IC_BANNER,
    data

})





export const getUserInfo = (data) => {
    return (dispatch, getState) => {
        instance.post(user.userInfoUrl, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {

                    dispatch(userInfo(res.data.data))
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

export const fetchUpdateName = (data) => {
    return (dispatch, getState) => {
        instance.post(user.updateNameUrl,qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    Toast.info('修改成功！', 1)
                    dispatch(updateName())
                    dispatch(getUserInfo({uid: data.uid,version:'1.1.0'}))
                }
                else {
                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

export const fetchOrderList = (tab, data) => {
    return (dispatch, getState) => {

        dispatch(requestOrderList(tab))

        instance.get(user.orderListUrl+"?"+ qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {

                    console.log(res)

                    if(res.data.data==null){
                        dispatch(receiveOrderList(tab, data.state, [], data.pagenum, data.pagesize, true))
                    }
                    else {

                        dispatch(receiveOrderList(tab, data.state, res.data.data.datalist, data.pagenum, data.pagesize, true))

                    }
                }
                else {

                    // Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

export const fetchMyBill = (data) => {
    return (dispatch, getState) => {


        instance.post(user.billUrl, qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {

                    dispatch(myBill(data.pagenum, data.pagesize, res.data.data))
                }
                else {

                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

export const fetchAddAds = (data, history) => {
    return (dispatch, getState) => {

        instance.post(user.addressUrl,qs.stringify(data))

            .then(res => {
                if (res.data.code == 200) {
                    Toast.info(res.data.msg, 1)
                    dispatch(addAdress())
                    history.goBack()
                }
                else {

                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

export const fetchGetAds = (data) => {
    return (dispatch, getState) => {

        instance.get(user.getAddressUrl +'?'+qs.stringify(data))

            .then(res => {

                if (res.data.code == 200) {

                    dispatch(getAdress(res.data.data))

                }
                else {

                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}


export const fetchDefAds = (data) => {
    return (dispatch, getState) => {

        instance.get(user.defaultAddressUrl+'?'+qs.stringify(data))

            .then(res => {

                if (res.data.code == 200) {

                    dispatch(defaultAds())
                }
                else {

                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}


export const fetchDelAds = (data) => {
    return (dispatch, getState) => {

        instance.get(user.delAddressUrl+'?'+qs.stringify(data))

            .then(res => {

                if (res.data.code == 200) {

                    dispatch(delAds())
                }
                else {

                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}


export const fetchUpdate = (data, history) => {

    return (dispatch, getState) => {

        instance.post(user.restPhoneUrl, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {

                    dispatch(updatePhone())
                    Toast.info(res.data.msg, 1)
                    history.goBack()

                } else {


                    Toast.info(res.data.msg, 1)

                }


            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

export const sendCode = (data) => {
    return (dispatch, getState) => {

        instance.post(user.sendRestSmsUrl, qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    Toast.info(res.data.msg, 1)
                    dispatch(sendRestPhoneSms())
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}
export const fetchCarCreateOrder = (data, history, count) => {
    data.payType='H5'
    return (dispatch, getState) => {
        Toast.loading("创建订单中，请稍后！", 1)
        instance.post(user.carCreateOrderUrl, qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    // Toast.info(res.data.msg, 1)
                    Toast.success("创建成功！", 1)
                    dispatch(carCreateOrder(res.data.data))
                    history.push(`/pay/${count}`)
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchGsCreateOrder = (data, history, count) => {
    data.payType='H5'
    return (dispatch, getState) => {

        Toast.loading("创建订单中，请稍后！", 1)

        instance.post(user.gsCreateOrderUrl, qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    // Toast.info(res.data.msg, 1)
                    Toast.success("创建成功！", 1)
                    dispatch(goodsCreateOrder(res.data.data))
                    history.push(`/pay/${count}`)
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchActiveOrder = (data, history, count) => {
    data.payType='H5'
    return (dispatch, getState) => {

        Toast.loading("创建订单中，请稍后！", 1)

        instance.post(user.activeOrder, qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    // Toast.info(res.data.msg, 1)
                    Toast.success("创建成功！", 1)
                    dispatch( activeOrder(res.data.data))

                    history.push(`/pay/${count}`)
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}









export const fetchDelOrder = (data, history, type) => {
    return (dispatch, getState) => {

        // Toast.loading("创建订单中，请稍后！",1)

        instance.get(user.delOrder+'?'+ qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    // Toast.info(res.data.msg, 1)
                    Toast.success("删除成功！",1)
                    dispatch(delOrder())

                    if (history && type) {

                        history.goBack()
                    }
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchOrderDetai = (data) => {
    return (dispatch, getState) => {


        instance.get(user.getOrderDetail+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {

                    // console.log(res.data)

                    dispatch(getOrderDetail(res.data.data))

                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}





export const fetchTopUp = (data,history) => {
    return (dispatch, getState) => {
        instance.get(user.topUpUrl+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(topUp(res.data.data))
                    dispatch(fetchPay({order_id:res.data.data.id,paytype:"H5"},history))

                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchWithDraw = (data,history) => {
    return (dispatch, getState) => {
        instance.get(user.drawMoneyUrl+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(withDraw(res.data.data))
                    Toast.success(res.data.data.msg,1)
                    history.push({
                        pathname:"/user",
                    })

                } else {

                    Toast.fail(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}







export const fetchPay = (data,history) => {
    return (dispatch, getState) => {
        instance.get(user.payUrl+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(gopay(res.data.data))
                    pay(res.data.data,history)

                } else {
                    Toast.fail(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}








export const fetchExpPay = (data,history) => {
    return (dispatch, getState) => {
        instance.get(user.expPayUrl+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    Toast.success("支付成功!",1)
                    dispatch(goMoneyPay(res.data.data))
                    setTimeout(()=>{
                        history.push('/')
                    },1000)
                } else {
                    Toast.fail(res.data.msg, 1)
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

export const fetchGetPostage = (data) => {
    return (dispatch, getState) => {
        instance.get(user.postage+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(getPostage(res.data.data))



                } else {
                    // Toast.fail(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchRefund = (data,history) => {

    return (dispatch, getState) => {

        instance.get(user.refundUrl+"?"+qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {

                    dispatch(applyRefund(res.data.data))

                    Toast.success(res.data.msg, 1)
                    history.goBack()

                } else {
                    Toast.fail(res.data.msg, 1)
                }

            })
            .catch(error => {


                console.log('error: ', error)

            })
    }
}


export const fetchComfirm = (data) => {
    return (dispatch, getState) => {
        instance.get(user.comfirmUrl+"?"+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(comfirmOreder(res.data.data))
                    Toast.success(res.data.msg, 1)
                } else {
                    Toast.fail(res.data.msg, 1)
                }
            })
            .catch(error => {

                console.log('error: ', error)

            })
    }
}



export const fetchJinfu = (data) => {
    return (dispatch, getState) => {
        instance.get(user.jinfuUrl+'?'+qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(getJinfu(res.data.data))
                }
            })
            .catch(error => {

                console.log('error: ', error)

            })
    }
}




export const fetchHelp = () => {
    return (dispatch, getState) => {
        instance.get(user.helpUrl)
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(getHelp(res.data.data))
                }
            })
            .catch(error => {

                console.log('error: ', error)

            })
    }
}


export const fetchTel = () => {
    return (dispatch, getState) => {
        instance.get(user.telUrl)
            .then(res => {
                if (res.data.code == 200) {
                    dispatch(getTel(res.data.data))
                }
            })
            .catch(error => {

                console.log('error: ', error)

            })
    }
}






export const fetchIcBaner = () => {
    return (dispatch, getState) => {
        instance.get(user.icbannerUrl)
            .then(res => {
                console.log(res)
                if (res.data.code == 200) {

                    dispatch(getIcBanner(res.data.data))
                }
            })
            .catch(error => {

                console.log('error: ', error)

            })
    }
}







