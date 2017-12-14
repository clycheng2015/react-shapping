/**
 * Created by bear on 2017/9/14.
 */
import instance from '../utils/instance'
import {user} from '../utils/api'
import * as types from '../utils/const'
import qs from 'qs'

export const getPostType = (data) => ({

    type: types.GET_POST_TYPE,
    data,

});


export const savePost = (data) => ({

    type: types.SAVE_POST_TYPE, data
})


export const clearPostType = () => ({

    type: 'CLEAR_POST_TYPE'
})


const getStoreAds = (data) => ({

    type: types.GET_STORE_ADS_LIST, data
})


export const fetchStoreAds = () => {
    "use strict";
    return (dispatch, getState) => {

        instance.get(user.storeAdsUrl)
            .then(res => {
                if (res.data.code === 200) {
                    let result = res.data.data
                    dispatch(getStoreAds(result))
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }


}
