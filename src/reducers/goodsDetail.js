/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    data:{},
    isFetching:false

}


export const goodsDetail = (state = init, action) => {


    switch (action.type) {
        case types.REQUEST_GOODS_DETAIL:
            return {...state,isFetching:true}
        case types.RECIEVE_GOODS_DETAIL:
            return {...state,isFetching:false,data:action.data}
        case 'DETAIL_REMOVE':
            return {...state,data:{}}
        default:
            return state
    }

}