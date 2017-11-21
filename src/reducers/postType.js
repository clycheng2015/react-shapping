
import * as types from '../utils/const'


let init = {
    postData: {
        type:0,
        ads:''
    },
    savePostData:{
        type:0,
        ads:''
    }
}
export function postType(state = init, action) {

    switch (action.type) {
        case types.GET_POST_TYPE:
            return {...state,postData:action.data}
        case types.SAVE_POST_TYPE:
            return {...state,savePostData:action.data}

        case 'CLEAR_ALL_STATE':

            return{...init}
        case 'CLEAR_POST_TYPE':

            return{...init}

        default:
            return state
    }

}