/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {search} from '../utils/api'
import * as types from '../utils/const'


const requestSearchList= () => ({
    type:types.REQUEST_SEARCH_LIST,
});


const receiveSearchList = (data) => ({
    type: types.RECIEVE_SEARCH_LIST,
    data
})

export const getSearchList = ( data) => {
    return (dispatch, getState) => {
        dispatch(requestSearchList());
        instance.post(search.detailUrl, qs.stringify(data))
            .then(res => {
                dispatch(receiveSearchList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

