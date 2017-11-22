/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    userInfo: {},
    loginStatus: false,
    mobile:"",
    password:''

}


export const auth = (state = init, action) => {


    switch (action.type) {

        case types.AUTH_LOGIN:

            return {...state, loginStatus:true,userInfo:action.userInfo}
        case types.AUTH_REG:
            return {...state}
        case types.AUTH_SEND_SMS_CODE:
            return {...state}
        case types.AUTH_UPDATE_PWD:
            return {...state,mobile:action.mobile,password:action.password}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}