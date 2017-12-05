

import * as types from '../utils/const'

let init = {
    data:[]
}

export const activeMoveMent = (state = init , action) =>{

    switch(action.type){
        case types.ACTIVE_MOVEMENT:
            return { ...state}
        default:
            return state
    }

}