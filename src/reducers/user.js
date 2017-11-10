/**
 * Created by bear on 2017/9/14.
 */
import * as types from '../utils/const'
let init = {
    userInfo: {},
    uid: "",
    order: {
        remark:'',
        isFetching: false,
        isHandle:false,
        pagesize: 100,
        pagenum: 1,
        tab: "待付款",
        tabIndex: 0,
        orderState:1,
        orderList: [],
        orderListInfo: {},
        tabs:
            [{title: '待付款', state: 1},
            {title: '待发货', state: 2},
            {title: '待收货', state: 3},
            {title: '退/换货', state: 4},
            {title: '已完成', state: 5}],
    },
    bill: {
        pagesize: 100,
        pagenum: 0,
        data: {}
    },
    address: {
        isFetchingDef: false,
        data: {},
    },
    orderDetail: {
        pathList: [],
        remark:""
    },
    yesOrderDetail:{},
    topUp:{},
    withDraw:{},
    payData:{},
    newPayOrder:{},
    postageData:{},
    jinfuData:{},
    helpData:{},
    kefuTel:{},
    IcBanner:{}


}
export const user = (state = init, action) => {
    switch (action.type) {
        case types.GET_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo,
                uid: action.userInfo.id
            }

        //设置
        case types.LOGIN_OUT:
            return {...state, userInfo: {}, uid: ''}

        case types.UPDATE_NAME:
            return {...state}
        //订单
        case types.ORDER_TAB_CHANGE:
            return {
                ...state, order: {
                    ...state.order,
                    tab: action.tab,
                    orderState: action.state,
                    tabIndex: action.index,
                    isFetching: false,
                    pagesize: 100,
                    pagenum: 1,
                    orderList: [],
                }
            }
        case types.REQUEST_ORDER_LIST:
            return {...state, order: {...state.order, isFetching: true,isHandle:false,}}
        case types.RECEIVE_ORDER_LIST:

            return {
                ...state,
                order: {
                    ...state.order,
                    isFetching: false,
                    isHandle:false,
                    pagesize: action.pagesize,
                    pagenum: action.pagenum,
                    orderList: action.datalist,
                    state:0,
                    orderListInfo: {
                        ...state.order.orderListInfo, [action.tab]: {
                            orderList: action.datalist,
                            isFetching: false,
                            isHandle:false,
                            pagesize: action.pagesize,
                            pagenum: action.pagenum,

                        }
                    },

                }
            }
        case types.GET_BILL_LIST:
            return {
                ...state,
                bill: {...state.bill, pagesize: action.pagesize, pagenum: action.pagenum, data: action.data}
            }

        case types.ADD_ADDRESS:

            return {...state, address: {...state.address,}}
        case types.GET_ADDRESS:

            return {...state, address: {...state.address, data: action.data, isFetchingDef: false,}}

        case types.DEFAULT_ADDRESS:

            return {...state, address: {...state.address, isFetchingDef: true,}}

        case types.DEL_ADDRESS:

            return {...state, address: {...state.address, isFetchingDef: true,}}

        case types.SAVE_PATH_STATE:

            return {...state, orderDetail: {...state.orderDetail, pathList: action.data,}}

        case types.CAR_CREATE_ORDER:

            return {...state,newPayOrder:action.data}

        case types.GOODS_CREATE_ORDER:

            return {...state,newPayOrder:action.data}

        case types.DEL_ORDER:

            return {
                ...state, order: {
                    ...state.order,
                    isHandle: true,
                }
            }


        case types.APPLY_REFUND:

            return {
                ...state, order: {
                    ...state.order,
                    isHandle: true,
                }
            }


        case types.CONFIRM_BUY_ORDER:

            return {
                ...state, order: {
                    ...state.order,
                    isHandle: true,
                }
            }


        case types.REFUND_REMARK:

            return {
                ...state, order: {
                    ...state.order,
                    remark: action.data,
                }
            }

        case types.ORDER_REMARK:

            return {
                ...state, orderDetail: {
                    ...state.orderDetail,
                    remark: action.data,
                }
            }





        case types.GET_ORDER_DETAIL:

            return {
                ...state,yesOrderDetail:action.data
            }

        case types.TOP_UP:

            return {
                ...state,topUp:action.data,newPayOrder:action.data
            }

        case types.DRAW_MONET:

            return {
                ...state,withDraw:action.data
            }
        case types.GO_PAY:

            return {
                ...state,payData:action.data,newPayOrder:{}
            }
        case types.GOTO_MONEY_PAY:

            return {
                ...state,payData:action.data,newPayOrder:{}
            }

        case types.SAVE_PAY_ORDER:
            return {
                ...state,newPayOrder:action.data
            }
        case types.GET_POSTAGE:
            return {
                ...state,postageData:action.data
            }
        case types.GOODS_ACTIVE_ORDER:
            return {
                ...state,newPayOrder:action.data
            }
        case types.GET_JINFU_PRO:
            return {
                ...state,jinfuData:action.data
            }

        case types.GET_HELP:
            return {
                ...state,helpData:action.data
            }

        case types.GET_Tel:
            return {
                ...state,kefuTel:action.data
            }

        case types.GET_IC_BANNER:
            return {
                ...state,IcBanner:action.data
            }


        default:
            return state
    }

}