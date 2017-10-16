/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {

    data: {},
    isFetching: false,
    pagesize: 100,
    pagenum: 1,


}


export const car = (state = init, action) => {


    switch (action.type) {
        case types.GET_CAR_LIST:
            return {...state, pagesize: action.pagesize, pagenum: action.pagenum, data: action.data, isFetching: false}
        case types.DEL_CAR_LIST:
            return {...state, isFetching: true}
        case types.UPDATE_CAR_NUM:
            return {...state, isFetching: true}
        default:
            return state
    }

}