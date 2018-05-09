/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    data: {},
    isFetching: false,
    drawerType: '',
    count: 1,

}


export const goodsDetail = (state = init, action) => {


    switch (action.type) {
        case types.REQUEST_GOODS_DETAIL:
            return {...state, isFetching: true}
        case types.RECIEVE_GOODS_DETAIL:
            return {...state, isFetching: false, data: action.data}
        case 'DETAIL_REMOVE':
            return {...state, data: {}}

        case 'DRAWER_TYPE':
            return {...state, drawerType: action.showType}

        case 'COUNT_ADD':


            return {...state, count: action.count}

        case 'COUNT_LOSE':

            return {...state, count: action.count}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}