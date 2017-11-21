/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    data:{},
    isFetching:false

}


export const activeDetail = (state = init, action) => {


    switch (action.type) {
        case types.REQUEST_ATGOODS_DETAIL:
            return {...state,isFetching:true}
        case types.RECIEVE_ATGOODS_DETAIL:
            return {...state,isFetching:false,data:action.data}
        case 'ACDETAIL_REMOVE':
            return {...state,data:{}}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}