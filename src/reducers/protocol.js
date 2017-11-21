
import * as types from '../utils/const'


let init = {

    protocol:{},
    list:[
        {
            type:'REGISTER',
            title:"用户注册协议"
        },
        {
            type:'MLGGOODS',
            title:"商城购物须知"
        },
        {
            type:'RECHARGE',
            title:"平台充值协议"
        },
        {
            type:'JFRECHARGE',
            title:"金凤充值协议"
        },
        {
            type:'MONEY',
            title:"美纶购钱包使用协议"
        },
        {
            type:'JUDUN',
            title:"金凤钱包使用协议"
        },
    ]
}
export function protocol(state = init, action) {

    switch (action.type) {
        case 'GET_PROTOCOL':

            return {...state,protocol:{

                ...state.protocol,
                [action.id]:action.data
            }}

        case 'CLEAR_ALL_STATE':

            return{...init}


        default:
            return state
    }

}