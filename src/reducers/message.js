import * as types from '../utils/const'


let init = {

    msgData:{},

    logisticsData:{},

    isRead:{}
}

export function message(state = init, action) {

    switch (action.type) {

        case types.GET_MESSAGE_LIST:

            return {...state, msgData: action.data}

        case types.GRT_LOGISTICS_LIST:

            return {...state, logisticsData: action.data}


        case types.GET_MSG_IS_READE:

            return {...state, isRead: action.data}

        case 'CLEAR_ALL_STATE':

            return {...init}
        default:
            return state
    }

}