

import * as types from '../utils/const'

let init = {
    data:{}
}

export const activeMoveMent = (state = init , action) =>{

    switch(action.type){
        case types.REQUEST_ACTIVE_MOVEMENT:
            return { ...state,data:action.data}
        default:
            return state
    }

}