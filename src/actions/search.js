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


const receiveSearchList = (data,pagesize,pagenum,word) => ({
    type: types.RECIEVE_SEARCH_LIST,
    data,pagesize,pagenum,word
})

export const getSearchList = ( data) => {
    return (dispatch, getState) => {
        dispatch(requestSearchList());
        instance.get(search.detailUrl+'?'+ qs.stringify(data))
            .then(res => {
                dispatch(receiveSearchList(res.data.data,data.pagesize,data.pagenum,data.word))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

