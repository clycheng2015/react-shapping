
import * as types from '../utils/const'


let init = {
    data: [],
    isFetching:false


}

export function search(state = init, action) {

    switch (action.type) {
        case types.REQUEST_SEARCH_LIST:
            return {...state,isFetching:true}
        case types.RECIEVE_SEARCH_LIST:
            return {...state,isFetching:false,data:action.data}
        default:
            return state
    }

}