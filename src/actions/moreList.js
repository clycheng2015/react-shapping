/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {moreList} from '../utils/api'
import * as types from '../utils/const'


const requestMoreList= () => ({
    type:types.REQUEST_MORE_TYPE_LIST,
});


const receiveMoreList = (data) => ({
    type: types.RECEIVE_MORE_TYPE_LIST,
    data
})
export const removeList=()=>({

    type:'MORE_REMOVE'

})
export const fetchMoreList = ( data) => {
    return (dispatch, getState) => {
        dispatch(requestMoreList());
        instance.post(moreList.listUrl, qs.stringify(data))
            .then(res => {

                if(res.data.code==200){

                    dispatch(receiveMoreList(res.data.data))
                }




            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

