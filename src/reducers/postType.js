import * as types from '../utils/const'


let init = {
    postData: {
        type: 0,
        ads: '',
        adsId:'',
        cvalue:0
    },
    savePostData: {
        type: 0,
        ads: '',
        adsId:'',
        cvalue:0
    },

    storeAds: []

}
export function postType(state = init, action) {

    switch (action.type) {
        case types.GET_POST_TYPE:
            return {...state, postData: action.data}
        case types.SAVE_POST_TYPE:
            return {...state, savePostData: action.data}

        case types.GET_STORE_ADS_LIST:

            let data = []

            if (action.data && action.data.length > 0) {


                data = action.data.map((i,k) => {
                    "use strict";
                    return {
                        ads: i,
                        key:k
                    }
                })

            }


            return {...state, storeAds: data}

        case 'CLEAR_ALL_STATE':

            return {...init}
        case 'CLEAR_POST_TYPE':

            return {...init}

        default:
            return state
    }

}