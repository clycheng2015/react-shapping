/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    data:{},
    isFetching:false

}


export const itemList = (state = init, action) => {


    switch (action.type) {
        case types.REQUEST_ITEM_GOODS_LIST:
            return {...state,isFetching:true}
        case types.RECIEVE_ITEM_GOODS_LIST:
            return {...state,isFetching:false,data:action.data}
        case 'ITEM_REMOVE':
            return {...state,data:{}}
        default:
            return state
    }

}