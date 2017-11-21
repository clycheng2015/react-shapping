/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {

    list: {},
    page:1,
    num:100,
    isFetching:false


}


export const item = (state = init, action) => {


    switch (action.type) {
        case types.REQUEST_ITEM_LIST:
            return {...state,isFetching:true}
        case types.RECIEVE_ITEM_LIST:
            return {...state,isFetching:false,page:action.page,num:action.num,list:action.list}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}