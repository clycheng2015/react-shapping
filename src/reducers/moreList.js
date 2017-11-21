/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    data:{},


    isFetching:false



}


export const moreList = (state = init, action) => {


    switch (action.type) {

        case types.REQUEST_MORE_TYPE_LIST:

            return {...state,isFetching:true}
        case types.RECEIVE_MORE_TYPE_LIST:

            return {...state,isFetching:false,data:action.data}
        case 'MORE_REMOVE':
            return {...state,data:{}}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}