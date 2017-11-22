/**
 * Created by bear on 2017/9/22.
 */

import * as types from '../utils/const'


let init = {

    paramsData: {},
    payState:"",
    activeState:'',

}

export function saveParams(state = init, action) {

    switch (action.type) {
        case types.SAVE_LOCATION_STATE:
            return {...state,paramsData:action.data}
        case types.SAVE_PAY_STATE:
            return {...state,payState:action.data}
        case types.SAVE_ACTIVE_STATE:
            return {...state,activeState:action.data}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}