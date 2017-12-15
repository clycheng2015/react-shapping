
import * as types from '../utils/const'

let init = {
    data:{}
}

export const inter = (state = init,action) =>{

    switch(action.type){
        case types.RECIEVE_INTER:
            return {...state,data:action.data}
        case types.REQUEST_INTER:
            return {...state}
        default:
            return state
    }
}